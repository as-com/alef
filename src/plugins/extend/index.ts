import assignStyle from "css-in-js-utils/lib/assignStyle";
import isObject from "../../utils/isObject";

function extendStyle(style: any,
                     extension: any,
                     extendPlugin: Function): void {
	// extend conditional style objects
	if (extension.hasOwnProperty("condition")) {
		if (extension.condition) {
			assignStyle(style, extendPlugin(extension.style));
		}
	} else {
		// extend basic style objects
		assignStyle(style, extension);
	}
}

function extend(style: object): object {
	for (const property in style) {
		const value = style[property];

		if (property === "extend") {
			const extensions = [].concat(value);

			for (let i = 0, len = extensions.length; i < len; i++) {
				extendStyle(style, extensions[i], extend);
			}

			delete style[property];
		} else if (isObject(value)) {
			// support nested extend as well
			style[property] = extend(value);
		}
	}

	return style;
}

export default () => extend;
