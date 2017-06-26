import Renderer from "../Renderer";
import {default as StyleType, FONT_TYPE, KEYFRAME_TYPE, RULE_TYPE, STATIC_TYPE} from "../utils/styleType";
import createStyleTagMarkup from "../utils/createStyleTagMarkup";

const sheetMap = {
	fontFaces: FONT_TYPE,
	statics: STATIC_TYPE,
	keyframes: KEYFRAME_TYPE,
	rules: RULE_TYPE
};

export type Sheet = {
	css: string;
	type: StyleType;
	media?: string;
};

export default class ServerRenderer extends Renderer {
	public renderToMarkup(): string {
		let markup = "";

		for (const style in sheetMap) {
			if (this[style].length > 0) { // TODO: ????
				markup += createStyleTagMarkup(this[style], sheetMap[style]);
			}
		}

		for (const media in this.mediaRules) {
			const mediaCSS = this.mediaRules[media];

			if (mediaCSS.length > 0) {
				markup += createStyleTagMarkup(mediaCSS, RULE_TYPE, media);
			}
		}

		return markup;
	}

	public renderToSheetList(): Sheet[] {
		const sheetList: Sheet[] = [];

		for (const style in sheetMap) {
			if (this[style].length > 0) {
				sheetList.push({
					css: this[style],
					type: sheetMap[style]
				});
			}
		}

		for (const media in this.mediaRules) {
			const mediaCSS = this.mediaRules[media];

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

}
