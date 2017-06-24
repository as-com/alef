import assignStyle from "css-in-js-utils/lib/assignStyle";

import { DOMRenderer } from "../../types/DOMRenderer";
import isObject from "../../utils/isObject";

type Type = "KEYFRAME" | "RULE" | "STATIC";
function resolveSimulation(
	style: Object,
	type: Type,
	renderer: DOMRenderer,
	props: any
): Object {
	if (props.simulate) {
		for (const property in style) {
			const value = style[property];

			if (isObject(value) && props.simulate[property]) {
				const resolvedValue = resolveSimulation(
					value,
					type,
					renderer,
					props
				);

				assignStyle(style, resolvedValue);
				delete style[property];
			}
		}
	}

	return style;
}

export default () => resolveSimulation;
