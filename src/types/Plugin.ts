import {StyleObject} from "./StyleObject";
export interface Plugin {
	(style: StyleObject): StyleObject;
}
