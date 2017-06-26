import {Style} from "./Style";
export interface Plugin {
	(style: Style): Style;
}
