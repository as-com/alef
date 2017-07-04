import assignStyle from "css-in-js-utils/lib/assignStyle";
import Renderer from "./Renderer";
import {Rule} from "./types/Rule";
import {StyleObject} from "./types/StyleObject";

export default function combineRules(...rules: Rule[]): Rule {
	return (props: object, renderer: Renderer): StyleObject => { // TODO
		const rule = {};
		for (let i = 0, len = rules.length; i < len; i++) {
			const r = rules[i];
			assignStyle(rule, typeof r === "function" ? r(props, renderer) : r);
		}

		return rule;
	};
}
