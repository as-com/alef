import cssifyDeclaration from "css-in-js-utils/lib/cssifyDeclaration";

import applyMediaRulesInOrder, {MediaRules} from "./utils/applyMediaRulesInOrder";
import {Cache} from "./types/Cache";
import {CLEAR_TYPE, FONT_TYPE, KEYFRAME_TYPE, RULE_TYPE, STATIC_TYPE} from "./utils/styleType";
import processStyleWithPlugins from "./utils/processStyleWithPlugins";
import generateAnimationName from "./utils/generateAnimationName";
import cssifyKeyframe from "./utils/cssifyKeyframe";
import {FontProperties} from "./types/FontProperties";
import toCSSString from "./utils/toCSSString";
import checkFontUrl from "./utils/checkFontUrl";
import checkFontFormat from "./utils/checkFontFormat";
import cssifyFontFace from "./utils/cssifyFontFace";
import generateStaticReference from "./utils/generateStaticReference";
import cssifyStaticStyle from "./utils/cssifyStaticStyle";
import generateCSSRule from "./utils/generateCSSRule";
import renderToString from "./tools/renderToString";
import isObject from "./utils/isObject";
import isNestedSelector from "./utils/isNestedSelector";
import normalizeNestedProperty from "./utils/normalizeNestedProperty";
import isMediaQuery from "./utils/isMediaQuery";
import generateCombinedMediaQuery from "./utils/generateCombinedMediaQuery";
import isUndefinedValue from "./utils/isUndefinedValue";
import {encode} from "./utils/base64";
import isClassnameProblematic from "./utils/isClassnameProblematic";
import generateCSSSelector from "./utils/generateCSSSelector";
import {StyleObject} from "./types/StyleObject";

export interface IRendererConfig {
	keyframePrefixes?: string[];
	plugins?: Function[];
	enhancers?: Function[];
	mediaQueryOrder?: string[],
	selectorPrefix?: string,
}

const adSearch = /ad/i;

export default class Renderer {
	private listeners: Function[] = [];
	private keyframePrefixes: string[];
	public plugins: Function[];
	private mediaQueryOrder: string[];
	protected selectorPrefix: string;

	protected fontFaces = "";
	protected keyframes = "";
	protected statics = "";
	protected rules = "";

	protected mediaRules: MediaRules;

	private ruleCtr = 10;
	private msb = 63;
	private power = 1;

	private keyframeCtr = 0;

	// use a flat cache object with pure string references
	// to achieve maximal lookup performance and memoization speed
	protected cache: Cache = {};

	public constructor(config: IRendererConfig) {
		this.keyframePrefixes = config.keyframePrefixes || ["-webkit-", "-moz-"];
		this.plugins = config.plugins || [];
		this.mediaQueryOrder = config.mediaQueryOrder || [];
		this.selectorPrefix = config.selectorPrefix || "";
		this.mediaRules = applyMediaRulesInOrder(config.mediaQueryOrder || []);
	}

	public renderRule(rule: Function, props: object = {}): string {
		const processedStyle = processStyleWithPlugins(
			this,
			rule(props, this),
			RULE_TYPE,
			props
		);
		return this._renderStyleToClassNames(processedStyle).slice(1);
	}

	public renderKeyframe(keyframe: Function, props: object = {}): string | boolean {
		const renderer = this;

		const resolvedKeyframe = keyframe(props, this);
		const keyframeReference = JSON.stringify(resolvedKeyframe);

		if (!this.cache.hasOwnProperty(keyframeReference)) {
			// use another unique identifier to ensure minimal css markup
			const animationName = generateAnimationName(
				++renderer.keyframeCtr
			);

			const processedKeyframe = processStyleWithPlugins(
				renderer,
				resolvedKeyframe,
				KEYFRAME_TYPE,
				props
			);

			const cssKeyframe = cssifyKeyframe(
				processedKeyframe,
				animationName,
				renderer.keyframePrefixes
			);

			renderer.cache[keyframeReference] = animationName;
			renderer.keyframes += cssKeyframe;

			renderer._emitChange({
				name: animationName,
				keyframe: cssKeyframe,
				type: KEYFRAME_TYPE
			});
		}

		return renderer.cache[keyframeReference];
	}

	public renderFont(family: string,
	                  files: string[],
	                  properties: FontProperties = {}): string | boolean {
		const renderer = this;
		const fontReference = family + JSON.stringify(properties);

		if (!renderer.cache.hasOwnProperty(fontReference)) {
			const fontFamily = toCSSString(family);

			// TODO: proper font family generation with error proofing
			const fontFace = {
				...properties,
				src: files
					.map(
						src =>
							`url(${checkFontUrl(
								src
							)}) format('${checkFontFormat(src)}')`
					)
					.join(","),
				fontFamily
			};

			const cssFontFace = cssifyFontFace(fontFace);
			renderer.cache[fontReference] = fontFamily;
			renderer.fontFaces += cssFontFace;

			renderer._emitChange({
				fontFamily,
				fontFace: cssFontFace,
				type: FONT_TYPE
			});
		}

		return renderer.cache[fontReference];
	}

	public renderStatic(staticStyle: StyleObject | string, selector?: string): void {
		const renderer = this;

		const staticReference = generateStaticReference(
			staticStyle,
			selector
		);

		if (!renderer.cache.hasOwnProperty(staticReference)) {
			const cssDeclarations = cssifyStaticStyle(
				staticStyle,
				renderer
			);
			renderer.cache[staticReference] = "";

			if (typeof staticStyle === "string") {
				renderer.statics += cssDeclarations;

				renderer._emitChange({
					type: STATIC_TYPE,
					css: cssDeclarations
				});
			} else if (selector) {
				renderer.statics += generateCSSRule(
					selector,
					cssDeclarations
				);
			}

			renderer._emitChange({
				type: STATIC_TYPE,
				css: cssDeclarations
			});
		}
	}

	public renderToString(): string {
		return renderToString(this);
	}

	public subscribe(callback: (change?: any) => void): { unsubscribe: Function } {
		this.listeners.push(callback);

		return {
			unsubscribe: () =>
				this.listeners.splice(
					this.listeners.indexOf(callback),
					1
				)
		};
	}

	public clear(): void {
		const renderer = this;

		renderer.fontFaces = "";
		renderer.keyframes = "";
		renderer.statics = "";
		renderer.rules = "";
		renderer.mediaRules = applyMediaRulesInOrder(
			renderer.mediaQueryOrder
		);

		renderer.ruleCtr = 10;
		renderer.msb = 63;
		renderer.power = 1;

		renderer.keyframeCtr = 0;
		renderer.cache = {};

		renderer._emitChange({type: CLEAR_TYPE});
	}

	protected _renderStyleToClassNames({_className, ...style}: any,
	                                   pseudo: string = "",
	                                   media: string = ""): string {
		const renderer = this;

		let classNames = _className || "";

		for (const property in style) {
			const value = style[property];

			if (isObject(value)) {
				if (isNestedSelector(property)) {
					classNames += renderer._renderStyleToClassNames(
						value,
						pseudo + normalizeNestedProperty(property),
						media
					);
				} else if (isMediaQuery(property)) {
					const combinedMediaQuery = generateCombinedMediaQuery(
						media,
						property.slice(6).trim()
					);

					classNames += renderer._renderStyleToClassNames(
						value,
						pseudo,
						combinedMediaQuery
					);
				} else {
					// TODO: warning
				}
			} else {
				const declarationReference =
					media + pseudo + property + value;

				if (!renderer.cache.hasOwnProperty(declarationReference)) {
					// we remove undefined values to enable
					// usage of optional props without side-effects
					if (isUndefinedValue(value)) {
						renderer.cache[declarationReference] = "";
						/* eslint-disable no-continue */
						continue;
						/* eslint-enable */
					}

					const className =
						renderer.selectorPrefix +
						renderer._generateClassName();

					renderer.cache[declarationReference] = className;

					const cssDeclaration = cssifyDeclaration(
						property,
						value
					);
					const selector = generateCSSSelector(className, pseudo);
					const cssRule = generateCSSRule(
						selector,
						cssDeclaration
					);

					if (media.length > 0) {
						if (!renderer.mediaRules.hasOwnProperty(media)) {
							renderer.mediaRules[media] = "";
						}

						renderer.mediaRules[media] += cssRule;
					} else {
						renderer.rules += cssRule;
					}

					renderer._emitChange({
						selector,
						declaration: cssDeclaration,
						media,
						type: RULE_TYPE
					});
				}

				classNames += ` ${renderer.cache[declarationReference]}`;
			}
		}

		return classNames;
	}

	private _generateClassName(): string {
		const renderer = this;

		// TODO: Write tests for this fragile thing

		// skipping 0-9, borrowed from Styletron
		if (renderer.ruleCtr === renderer.msb + 1) {
			renderer.ruleCtr += (renderer.msb + 1) * 9;
			renderer.msb = Math.pow(64, ++renderer.power) - 1;
		}

		// make sure the class is not going to be blocked by adblock
		if (!renderer.selectorPrefix && isClassnameProblematic(renderer.ruleCtr)) {
			renderer.ruleCtr++;
			return renderer._generateClassName();
		}

		let gen = encode(renderer.ruleCtr);

		let adCheck = gen.search(adSearch);
		if (adCheck !== -1) {
			renderer.ruleCtr += Math.pow(64, gen.length - adCheck - 2);
			return renderer._generateClassName();
		}

		renderer.ruleCtr++;

		return gen;
	}

	protected _emitChange(change: object): void {
		for (let i = 0, len = this.listeners.length; i < len; i++) {
			this.listeners[i](change);
		}
	}
}

export type RendererConstructor = new(...args: any[]) => Renderer;
