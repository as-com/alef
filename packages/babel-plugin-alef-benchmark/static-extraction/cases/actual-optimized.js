import { createRenderer } from 'alef'
import variations from './_variations'

export const optimizedActual = () => {
  const renderer = createRenderer()
  renderer.precompiled = {}

  const rule = ({ fontSize, width }) => {
    if (!renderer.precompiled[0]) {
      renderer.precompiled[0] = renderer.renderRule(() => ({
        backgroundColor: 'black',
        lineHeight: 1.0,
        ':hover': {
          color: 'red'
        },
        '@media (min-width: 300px)': {
          backgroundColor: 'yellow',
          color: 'green'
        }
      }))
    }

    return {
      _className: renderer.precompiled[0],
      fontSize: `${fontSize}px`,
      width: `${width}px`
    }
  }

  variations.forEach(variation => renderer.renderRule(rule, variation))
  return renderer.rules
}
