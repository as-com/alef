import { cssifyMediaQueryRules, objectReduce } from 'alef-utils'

export default function renderToString(renderer: Object): string {
  const basicCSS =
    renderer.fontFaces + renderer.statics + renderer.keyframes + renderer.rules

  return objectReduce(
    renderer.mediaRules,
    (css, rules, query) => css + cssifyMediaQueryRules(query, rules),
    basicCSS
  )
}
