import {StyleObject} from "./StyleObject";
import Renderer from "../Renderer";

export type Rule = ((props: object, renderer?: Renderer) => StyleObject) | StyleObject;
