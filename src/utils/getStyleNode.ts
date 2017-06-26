import createStyleNode from "./createStyleNode";
import StyleType from "./styleType";
import {IStyleNodes} from "../client/AlefClient";

export default function getStyleNode(styleNodes: IStyleNodes,
                                     baseNode: Object,
                                     type: StyleType,
                                     media: string = ""): HTMLStyleElement {
	const key = type + media;

	if (!styleNodes[key]) {
		styleNodes[key] = createStyleNode(type, media, baseNode);
	}

	return styleNodes[key];
}
