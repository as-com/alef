import cssifyObject from "css-in-js-utils/lib/cssifyObject";

import {FontFace} from "../types/FontFace";

export default function cssifyFontFace(fontFace: FontFace): string {
	return `@font-face{${cssifyObject(fontFace)}}`;
}
