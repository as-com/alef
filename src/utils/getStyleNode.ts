import createStyleNode from "./createStyleNode";
import StyleType from "./styleType";

export default function getStyleNode(
	styleNodes: Object,
	baseNode: Object,
	type: StyleType,
	media: string = ""
): any {
	const key = type + media;

	if (!styleNodes[key]) {
		styleNodes[key] = createStyleNode(type, media, baseNode);
	}

	return styleNodes[key];
}
