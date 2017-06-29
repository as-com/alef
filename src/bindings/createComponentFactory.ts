import extractPassThroughProps from "../utils/extractPassThroughProps";
import resolvePassThrough from "../utils/resolvePassThrough";
import combineRules from "../combineRules";
import Renderer from "../Renderer";
import {WithMonolithicInstance} from "../enhancers/monolithic/index";
import {Rule} from "../types/Rule";

// XXX: This should no longer be used

export default function createComponentFactory(createElement: Function,
                                               contextTypes?: Object): Function {
	return function createComponent(rule: Rule,
	                                type: any = "div",
	                                passThroughProps: (() => string[]) | string[] = []): Function {
		const displayName = typeof rule === "function" && rule.name ? rule.name : "AlefComponent";

		const AlefComponent = ({children, _alefRule, ...ruleProps},
		                       {renderer, theme}: { renderer: Renderer, theme: any }) => {
			if (!renderer) {
				throw new Error(
					"createComponent() can't render styles without the renderer in the context. Missing react-alef's <Provider /> at the app root?"
				);
			}

			const combinedRule = _alefRule
				? combineRules(rule, _alefRule)
				: rule;

			// improve developer experience with monolithic renderer
			// if ((renderer as Renderer & WithMonolithicInstance).prettySelectors) { // TODO???
			// 	const componentName = typeof type === "string"
			// 		? type
			// 		: type.displayName || type.name || "";
			//
			// 	combinedRule.selectorPrefix = `${displayName}_${componentName}__`;
			// }

			// compose passThrough props from arrays or functions
			const resolvedPassThrough = resolvePassThrough(passThroughProps, ruleProps);

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

			if (ruleProps.style) {
				componentProps.style = ruleProps.style;
			}
			const cls = ruleProps.className
				? `${ruleProps.className} `
				: "";
			componentProps.className =
				cls + renderer.renderRule(combinedRule, ruleProps);

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
			(<any>AlefComponent).contextTypes = contextTypes; // TODO
		}

		// use the rule name as display name to better debug with react inspector
		(<any>AlefComponent).displayName = displayName;
		(<any>AlefComponent)._isAlefComponent = true;

		return AlefComponent;
	};
}
