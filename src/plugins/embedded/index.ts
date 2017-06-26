import isObject from "../../utils/isObject";
import Renderer from "../../Renderer";
import StyleType from "../../utils/styleType";

function embedded(style: any, type: StyleType, renderer: Renderer): Object {
	for (const property in style) {
		const value = style[property];

		if (property === "fontFace" && isObject(value)) {
			const {fontFamily, src, ...otherProps} = value;
			if (typeof fontFamily === "string" && Array.isArray(src)) {
				style.fontFamily = renderer.renderFont(
					fontFamily,
					src,
					otherProps
				);
				delete style.fontFace;
			} else {
				// TODO: warning - invalid font data
			}
		} else if (property === "animationName" && isObject(value)) {
			style[property] = renderer.renderKeyframe(() => value);
		} else if (isObject(value)) {
			embedded(value, type, renderer);
		}
	}

	return style;
}

export default () => embedded;
