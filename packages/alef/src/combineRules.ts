import assignStyle from "css-in-js-utils/lib/assignStyle";
import { arrayReduce } from "alef-utils";

import { DOMRenderer } from "../../../types/DOMRenderer";
import { NativeRenderer } from "../../../types/NativeRenderer";

export default function combineRules(...rules: Array<Function>): Function {
	return (props: Object, renderer: DOMRenderer | NativeRenderer): Object =>
		arrayReduce(
			rules,
			(style, rule) => assignStyle(style, rule(props, renderer)),
			{}
		);
}
