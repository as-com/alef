function resolveNesting(style, nesting, key) {
  const nestedObject = style[nesting]
  if (nestedObject) {
    for (let nestedKey in nestedObject) {
      style[key + nestedKey] = nestedObject[nestedKey]
    }
    delete style[nesting]
  }

  return style
}

const nestings = { pseudo: ':', media: '@media', children: '>' }

function transform(style) {
  for (let nesting in nestings) {
    resolveNesting(style, nesting, nestings[nesting])
  }
  return style
}


export default () => transform
