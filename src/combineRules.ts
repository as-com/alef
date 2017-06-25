import assignStyle from "css-in-js-utils/lib/assignStyle";
import arrayReduce from "./utils/arrayReduce";
import Renderer from "./Renderer";

export default function combineRules(...rules: Function[]): Function {
	return (props: Object, renderer: Renderer): Object =>
		arrayReduce(
			rules,
			(style, rule) => assignStyle(style, rule(props, renderer)),
			{}
		);
}
