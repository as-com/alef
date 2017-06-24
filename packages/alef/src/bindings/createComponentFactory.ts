import { extractPassThroughProps, resolvePassThrough } from "alef-utils";
import combineRules from "../combineRules";

export default function createComponentFactory(
	createElement: Function,
	contextTypes?: Object
): Function {
	return function createComponent(
		rule: Function,
		type: any = "div",
		passThroughProps: Array<string> | Function = []
	): Function {
		const displayName = rule.name ? rule.name : "AlefComponent";

		const AlefComponent = (
			{ children, _alefRule, passThrough = [], ...ruleProps },
			{ renderer, theme }
		) => {
			if (!renderer) {
				throw new Error(
					"createComponent() can't render styles without the renderer in the context. Missing react-alef's <Provider /> at the app root?"
				);
			}

			const combinedRule = _alefRule
				? combineRules(rule, _alefRule)
				: rule;

			// improve developer experience with monolithic renderer
			if (renderer.prettySelectors) {
				const componentName = typeof type === "string"
					? type
					: type.displayName || type.name || "";

				combinedRule.selectorPrefix = `${displayName}_${componentName}__`;
			}

			// compose passThrough props from arrays or functions
			const resolvedPassThrough = [
				...resolvePassThrough(passThroughProps, ruleProps),
				...resolvePassThrough(passThrough, ruleProps)
			];

			// if the component renders into another Alef component
			// we pass down the combinedRule as well as both
			if (type._isAlefComponent) {
				return createElement(
					type,
					{
						_alefRule: combinedRule,
						passThrough: resolvedPassThrough,
						...ruleProps
					},
					children
				);
			}

			const componentProps = extractPassThroughProps(
				resolvedPassThrough,
				ruleProps
			);

			ruleProps.theme = theme || {};

			// alef-native support
			if (renderer.isNativeRenderer) {
				const alefStyle = renderer.renderRule(combinedRule, ruleProps);
				componentProps.style = ruleProps.style
					? [ruleProps.style, alefStyle]
					: alefStyle;
			} else {
				if (ruleProps.style) {
					componentProps.style = ruleProps.style;
				}
				const cls = ruleProps.className
					? `${ruleProps.className} `
					: "";
				componentProps.className =
					cls + renderer.renderRule(combinedRule, ruleProps);
			}

			if (ruleProps.id) {
				componentProps.id = ruleProps.id;
			}

			if (ruleProps.innerRef) {
				componentProps.ref = ruleProps.innerRef;
			}

			const customType = ruleProps.is || type;
			return createElement(customType, componentProps, children);
		};

		if (contextTypes) {
			AlefComponent.contextTypes = contextTypes;
		}

		// use the rule name as display name to better debug with react inspector
		AlefComponent.displayName = displayName;
		AlefComponent._isAlefComponent = true;

		return AlefComponent;
	};
}
