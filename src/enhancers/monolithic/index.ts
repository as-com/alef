/* eslint-disable no-continue */
import cssifyObject from "css-in-js-utils/lib/cssifyObject";

import {DOMRenderer} from "../../types/DOMRenderer";
import {MonolithicRenderer} from "../../types/MonolithicRenderer";
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

function useMonolithicRenderer(
	renderer: DOMRenderer,
	prettySelectors: boolean = false
): MonolithicRenderer {
	(<any> renderer).prettySelectors = prettySelectors; // TODO

	(<any> renderer)._renderStyleToCache = ( // TODO
		className: string,
		style: Object,
		pseudo: string = "",
		media: string = ""
	) => {
		const ruleSet = objectReduce(
			style,
			(ruleset, value, property) => {
				if (isObject(value)) {
					if (isNestedSelector(property)) {
						(<any> renderer)._renderStyleToCache(
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

						(<any> renderer)._renderStyleToCache(
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
				if (!renderer.mediaRules.hasOwnProperty(media)) {
					renderer.mediaRules[media] = "";
				}

				renderer.mediaRules[media] += cssRule;
			} else {
				renderer.rules += cssRule;
			}

			renderer._emitChange({
				selector,
				declaration: css,
				media,

				type: RULE_TYPE
			});
		}
	};

	renderer._renderStyleToClassNames = (
		style: Object,
		rule: Function
	): string => {
		if (Object.keys(style).length < 1) {
			return "";
		}

		const localRulePrefix = (<any> renderer).prettySelectors && rule.name
			? `${rule.name}_`
			: "";

		const className = generateMonolithicClassName(
			style,
			(renderer.selectorPrefix || "") +
				((<any> rule /* TODO */).selectorPrefix || localRulePrefix)
		);

		if (!renderer.cache.hasOwnProperty(className)) {
			(<any> renderer)._renderStyleToCache(className, style);
			renderer.cache[className] = true;
		}

		return className;
	};

	renderer.renderRule = (rule: Function, props: Object = {}): string => {
		const processedStyle = processStyleWithPlugins(
			renderer,
			rule(props, renderer),
			RULE_TYPE,
			props
		);
		return renderer._renderStyleToClassNames(processedStyle, rule);
	};

	return renderer as any; // TODO
}

export default function monolithic(options: any = {}) {
	return (renderer: DOMRenderer) =>
		useMonolithicRenderer(
			renderer,
			process.env.NODE_ENV !== "production" && options.prettySelectors
		);
}
