import assignStyle from "css-in-js-utils/lib/assignStyle";
import Renderer from "./Renderer";

export default function combineRules(...rules: Function[]): Function {
	return (props: Object, renderer: Renderer): object => { // TODO
		const rule = {};
		for (let i = 0, len = rules.length; i < len; i++) {
			assignStyle(rule, rules[i](props, renderer));
		}

		return rule;
	};
}
