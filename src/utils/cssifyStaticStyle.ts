import cssifyObject from "css-in-js-utils/lib/cssifyObject";

import minifyCSSString from "./minifyCSSString";
import processStyleWithPlugins from "./processStyleWithPlugins";

import {STATIC_TYPE} from "./styleType";

import Renderer from "../Renderer";
import {Style} from "../types/Style";

export default function cssifyStaticStyle(staticStyle: string | Style,
                                          renderer: Renderer): string {
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
