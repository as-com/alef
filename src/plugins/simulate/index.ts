import assignStyle from "css-in-js-utils/lib/assignStyle";

import isObject from "../../utils/isObject";
import Renderer from "../../Renderer";

type Type = "KEYFRAME" | "RULE" | "STATIC";
function resolveSimulation(style: any, // TODO
                           type: Type,
                           renderer: Renderer,
                           props: any): Object {
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
