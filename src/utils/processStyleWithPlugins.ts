import arrayReduce from "./arrayReduce";

import {DOMRenderer} from "../types/DOMRenderer";
import StyleType from "./styleType";
import Renderer from "../Renderer";

export default function processStyleWithPlugins(renderer: Renderer,
                                                style: Object,
                                                type: StyleType,
                                                props: Object = {}) {
	if (renderer.plugins.length > 0) {
		return arrayReduce(
			renderer.plugins,
			(processedStyle, plugin) => {
				processedStyle = plugin(processedStyle, type, renderer, props);
				return processedStyle;
			},
			style
		);
	}

	return style;
}
