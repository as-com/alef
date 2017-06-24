import { createRenderer } from 'alef'
import embedded from 'alef-plugin-embedded'
import prefixer from 'alef-plugin-prefixer'
import fallbackValue from 'alef-plugin-fallback-value'
import unit from 'alef-plugin-unit'
import lvha from 'alef-plugin-lvha'
import validator from 'alef-plugin-validator'
import logger from 'alef-plugin-logger'
import perf from 'alef-perf'
import beautifier from 'alef-beautifier'

export default () => {
  const renderer = createRenderer({
    plugins: [
      embedded(),
      prefixer(),
      fallbackValue(),
      unit(),
      lvha(),
      validator(),
      logger()
    ],
    enhancers: [perf(), beautifier()]
  })

  renderer.renderStatic(
    {
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      fontFamily: 'Lato'
    },
    'html,body,#app'
  )

  renderer.renderStatic({ display: 'flex' }, 'div')
  return renderer
}
