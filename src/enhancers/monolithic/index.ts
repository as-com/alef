/* eslint-disable no-continue */
import cssifyObject from "css-in-js-utils/lib/cssifyObject";

import objectReduce from "../../utils/objectReduce";
import isObject from "../../utils/isObject";
import isNestedSelector from "../../utils/isNestedSelector";
import normalizeNestedProperty from "../../utils/normalizeNestedProperty";
import isMediaQuery from "../../utils/isMediaQuery";
import generateCombinedMediaQuery from "../../utils/generateCombinedMediaQuery";
import isUndefinedValue from "../../utils/isUndefinedValue";
import generateCSSSelector from "../../utils/generateCSSSelector";
import generateCSSRule from "../../utils/generateCSSRule";
import {RULE_TYPE} from "../../utils/styleType";
import generateMonolithicClassName from "../../utils/generateMonolithicClassName";
import processStyleWithPlugins from "../../utils/processStyleWithPlugins";
import {RendererConstructor} from "../../Renderer";

export interface IMonolithicOptions {
	prettySelectors?: boolean
}

export default function MonolithicEnhancer<T extends RendererConstructor>(Base: T, options: IMonolithicOptions) {
	return class extends Base {
		private _renderStyleToCache(className: string, style: object, pseudo: string = "", media: string = "") {
			const ruleSet = objectReduce(
				style,
				(ruleset, value, property) => {
					if (isObject(value)) {
						if (isNestedSelector(property)) {
							this._renderStyleToCache(
								className,
								value,
								pseudo + normalizeNestedProperty(property),
								media
							);
						} else if (isMediaQuery(property)) {
							const combinedMediaQuery = generateCombinedMediaQuery(
								media,
								property.slice(6).trim()
							);

							this._renderStyleToCache(
								className,
								value,
								pseudo,
								combinedMediaQuery
							);
						} else {
							// TODO: warning
						}
					} else if (!isUndefinedValue(value)) {
						ruleset[property] = value;
					}

					return ruleset;
				},
				{}
			);

			if (Object.keys(ruleSet).length > 0) {
				const css = cssifyObject(ruleSet);
				const selector = generateCSSSelector(className, pseudo);
				const cssRule = generateCSSRule(selector, css);

				if (media.length > 0) {
					if (!this.mediaRules.hasOwnProperty(media)) {
						this.mediaRules[media] = "";
					}

					this.mediaRules[media] += cssRule;
				} else {
					this.rules += cssRule;
				}

				this._emitChange({
					selector,
					declaration: css,
					media,

					type: RULE_TYPE
				});
			}
		}

		protected _renderStyleToClassNames(style: object, pseudo): string { // TODO: Figure out why the parameters are different
			const rule = <Function>pseudo; // TODO: ???

			if (Object.keys(style).length < 1) {
				return "";
			}

			const localRulePrefix = options.prettySelectors && rule.name
				? `${rule.name}_`
				: "";

			const className = generateMonolithicClassName(
				style,
				(this.selectorPrefix || "") +
				((<any> rule /* TODO */).selectorPrefix || localRulePrefix)
			);

			if (!this.cache.hasOwnProperty(className)) {
				this._renderStyleToCache(className, style);
				this.cache[className] = true;
			}

			return className;
		}


		public renderRule(rule: Function, props: Object = {}): string {
			const processedStyle = processStyleWithPlugins(
				this,
				rule(props, this),
				RULE_TYPE,
				props
			);
			return this._renderStyleToClassNames(processedStyle, rule);
		}
	}
}
