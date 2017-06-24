import extend from "alef-plugin-extend";
import prefixer from "alef-plugin-prefixer";
import fallbackValue from "alef-plugin-fallback-value";
import LVHA from "alef-plugin-lvha";
import unit from "alef-plugin-unit";

export default [extend(), prefixer(), fallbackValue(), LVHA(), unit()];
