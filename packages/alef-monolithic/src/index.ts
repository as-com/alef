/* eslint-disable no-continue */
import cssifyObject from "css-in-js-utils/lib/cssifyObject";

import {
	isObject,
	isMediaQuery,
	isNestedSelector,
	isUndefinedValue,
	objectReduce,
	normalizeNestedProperty,
	processStyleWithPlugins,
	generateMonolithicClassName,
	generateCombinedMediaQuery,
	generateCSSSelector,
	generateCSSRule,
	RULE_TYPE
} from "alef-utils";

import DOMRenderer from "../../../types/DOMRenderer";
import MonolithicRenderer from "../../../types/MonolithicRenderer";

function useMonolithicRenderer(
	renderer: DOMRenderer,
	prettySelectors: boolean = false
): MonolithicRenderer {
	renderer.prettySelectors = prettySelectors;

	renderer._renderStyleToCache = (
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
						renderer._renderStyleToCache(
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

						renderer._renderStyleToCache(
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

		const localRulePrefix = renderer.prettySelectors && rule.name
			? `${rule.name}_`
			: "";

		const className = generateMonolithicClassName(
			style,
			(renderer.selectorPrefix || "") +
				(rule.selectorPrefix || localRulePrefix)
		);

		if (!renderer.cache.hasOwnProperty(className)) {
			renderer._renderStyleToCache(className, style);
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

	return renderer;
}

export default function monolithic(options: Object = {}) {
	return (renderer: DOMRenderer) =>
		useMonolithicRenderer(
			renderer,
			process.env.NODE_ENV !== "production" && options.prettySelectors
		);
}
