import resolveArrayValue from 'css-in-js-utils/lib/resolveArrayValue'

import { isObject } from 'alef-utils'

function resolveFallbackValues(style: Object): Object {
  for (const property in style) {
    const value = style[property]

    if (Array.isArray(value)) {
      style[property] = resolveArrayValue(property, value)
    } else if (isObject(value) && property !== 'fontFace') {
      style[property] = resolveFallbackValues(value)
    }
  }

  return style
}

export default () => resolveFallbackValues
