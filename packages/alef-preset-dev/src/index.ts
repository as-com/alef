import logger from "alef-plugin-logger";
import validator from "alef-plugin-validator";

export default [(<any>logger /* TODO */)({ logMetaData: true }), validator()];
