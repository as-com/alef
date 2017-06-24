import logger from "../../plugins/logger";
import validator from "../../plugins/validator";

export default [(<any>logger /* TODO */)({ logMetaData: true }), validator()];
