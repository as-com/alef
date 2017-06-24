import logger from 'alef-plugin-logger'
import validator from 'alef-plugin-validator'

export default [logger({ logMetaData: true }), validator()]
