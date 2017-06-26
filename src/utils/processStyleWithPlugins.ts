import StyleType from "./styleType";
import Renderer from "../Renderer";

export default function processStyleWithPlugins(renderer: Renderer,
                                                style: object,
                                                type: StyleType,
                                                props: object = {}) {
	const plugins = renderer.plugins;
	if (plugins.length > 0) {
		let processedStyle = style;

		for (let i = 0, len = plugins.length; i < len; i++) {
			processedStyle = plugins[i](processedStyle, type, renderer, props);
		}

		return processedStyle;
	}

	return style;
}
