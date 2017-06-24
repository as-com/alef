import assignStyle from "css-in-js-utils/lib/assignStyle";
import { arrayReduce } from "alef-utils";

import { DOMRenderer } from "../../../types/DOMRenderer";

export default function combineRules(...rules: Function[]): Function {
	return (props: Object, renderer: DOMRenderer): Object =>
		arrayReduce(
			rules,
			(style, rule) => assignStyle(style, rule(props, renderer)),
			{}
		);
}
