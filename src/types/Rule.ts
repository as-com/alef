import {StyleObject} from "./StyleObject";
import {StyleArray} from "./StyleArray";

export type Rule = (props: object) => StyleObject | StyleObject | StyleArray;
