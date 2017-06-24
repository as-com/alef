import {DOMRenderer} from "../types/DOMRenderer";
import {FONT_TYPE, KEYFRAME_TYPE, RULE_TYPE, STATIC_TYPE, default as StyleType} from "../utils/styleType";
import getStyleNode from "../utils/getStyleNode";
import reflushStyleNodes from "../utils/reflushStyleNodes";

const sheetMap = {
	fontFaces: FONT_TYPE,
	statics: STATIC_TYPE,
	keyframes: KEYFRAME_TYPE,
	rules: RULE_TYPE
};

function initNode(
	styleNodes: Object,
	baseNode: Object,
	css: string,
	type: StyleType,
	media: string = ""
): void {
	const node = getStyleNode(styleNodes, baseNode, type, media);
	// in case that there is a node coming from server already
	// but rules are not matchnig
	if (node.textContent !== css) {
		node.textContent = css;
	}
}

export default function initStyleNodes(renderer: DOMRenderer): void {
	renderer.styleNodes = reflushStyleNodes();
	const baseNode = renderer.styleNodes[RULE_TYPE];

	for (const style in sheetMap) {
		if (renderer[style].length > 0) {
			initNode(
				renderer.styleNodes,
				baseNode,
				renderer[style],
				sheetMap[style]
			);
		}
	}

	for (const media in renderer.mediaRules) {
		const mediaCSS = renderer.mediaRules[media];

		if (mediaCSS.length > 0) {
			initNode(renderer.styleNodes, baseNode, mediaCSS, RULE_TYPE, media);
		}
	}
}
