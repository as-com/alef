import arrayReduce from "./arrayReduce";

import {DOMRenderer} from "../../types/DOMRenderer";

type Type = "RULE" | "KEYFRAME" | "STATIC";

export default function processStyleWithPlugins(
	renderer: DOMRenderer,
	style: Object,
	type: Type,
	props: Object = {}
) {
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
