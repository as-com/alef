import cssifyObject from "css-in-js-utils/lib/cssifyObject";

import minifyCSSString from "./minifyCSSString";
import processStyleWithPlugins from "./processStyleWithPlugins";

import { STATIC_TYPE } from "./styleTypes";

import {DOMRenderer} from "../../../types/DOMRenderer";

export default function cssifyStaticStyle(
	staticStyle: string | Object,
	renderer: DOMRenderer
): string {
	if (typeof staticStyle === "string") {
		return minifyCSSString(staticStyle);
	}

	const processedStaticStyle = processStyleWithPlugins(
		renderer,
		staticStyle,
		STATIC_TYPE
	);
	return cssifyObject(processedStaticStyle);
}
