import extend from "../../plugins/extend";
import prefixer from "../../plugins/prefixer";
import fallbackValue from "../../plugins/fallback-value";
import LVHA from "../../plugins/lvha";
import unit from "../../plugins/unit";

export default [extend(), prefixer(), fallbackValue(), LVHA(), unit()];
