import {StyleObject} from "./StyleObject";
import Renderer from "../Renderer";

export type Rule<P = object> = ((props: P, renderer?: Renderer) => StyleObject) | StyleObject;
