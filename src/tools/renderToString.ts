import cssifyMediaQueryRules from "../utils/cssifyMediaQueryRules";
import objectReduce from "../utils/objectReduce";

export default function renderToString(renderer: any): string {
	const basicCSS =
		renderer.fontFaces +
		renderer.statics +
		renderer.keyframes +
		renderer.rules;

	return objectReduce(
		renderer.mediaRules,
		(css, rules, query) => css + cssifyMediaQueryRules(query, rules),
		basicCSS
	);
}
