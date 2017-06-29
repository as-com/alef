import {StyleObject} from "./StyleObject";

export type Rule = (props: object) => StyleObject | StyleObject;
