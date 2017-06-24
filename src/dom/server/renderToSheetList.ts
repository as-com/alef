import {FONT_TYPE, KEYFRAME_TYPE, RULE_TYPE, STATIC_TYPE, default as StyleType} from "../../utils/styleType";

const sheetMap = {
	fontFaces: FONT_TYPE,
	statics: STATIC_TYPE,
	keyframes: KEYFRAME_TYPE,
	rules: RULE_TYPE
};
type Sheet = {
	css: string;
	type: StyleType;
	media?: string;
};

export default function renderToSheetList(renderer: any): Sheet[] { // TODO
	const sheetList = [];

	for (const style in sheetMap) {
		if (renderer[style].length > 0) {
			sheetList.push({
				css: renderer[style],
				type: sheetMap[style]
			});
		}
	}

	for (const media in renderer.mediaRules) {
		const mediaCSS = renderer.mediaRules[media];

		if (mediaCSS.length > 0) {
			sheetList.push({
				css: mediaCSS,
				type: RULE_TYPE,
				media
			});
		}
	}

	return sheetList;
}
