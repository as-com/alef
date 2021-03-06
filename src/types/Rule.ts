import {StyleObject} from "./StyleObject";
import Renderer from "../Renderer";

export type Rule<P = any> = ((props: P, context?: object) => StyleObject) | StyleObject;
