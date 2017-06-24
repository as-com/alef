import {DOMRenderer} from "../../types/DOMRenderer";
import {FONT_TYPE, KEYFRAME_TYPE, RULE_TYPE, STATIC_TYPE} from "../../utils/styleType";
import createStyleTagMarkup from "../../utils/createStyleTagMarkup";

const sheetMap = {
	fontFaces: FONT_TYPE,
	statics: STATIC_TYPE,
	keyframes: KEYFRAME_TYPE,
	rules: RULE_TYPE
};

export default function renderToMarkup(renderer: DOMRenderer): string {
	let markup = "";

	for (const style in sheetMap) {
		if (renderer[style].length > 0) {
			markup += createStyleTagMarkup(renderer[style], sheetMap[style]);
		}
	}

	for (const media in renderer.mediaRules) {
		const mediaCSS = renderer.mediaRules[media];

		if (mediaCSS.length > 0) {
			markup += createStyleTagMarkup(mediaCSS, RULE_TYPE, media);
		}
	}

	return markup;
}
