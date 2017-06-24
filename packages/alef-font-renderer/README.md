# alef-font-renderer

> Deprecated: With alef 5.0.0 this enhancer is no longer required as alef-dom now renders fonts into its own stylesheet.

<img alt="npm downloads" src="https://img.shields.io/npm/dm/alef-font-renderer.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-2.47kb-brightgreen.svg">

Allocates all `renderFont` calls to a separate renderer which renders into a separate `mountNode` to prevent refetching the `@font-face` every time.

## Installation
```sh
yarn add alef-font-renderer
```
You may alternatively use `npm i --save alef-font-renderer`.

## Usage
### Configuration
##### Options
| Option | Value | Default | Description |
| ------ | --- | ------------ | --- |
|mountNode| *([HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement))* | | DOM node to render `@font-face` markup into |


##### Example
###### Client
Using the enhancer for client-side rendering can be achieved by simply passing another `mountNode` to the enhancer.
```javascript
import { createRenderer, render } from 'alef'
import fontRenderer from 'alef-font-renderer'

const mountNode = document.getElementById('font-stylesheet')
const fontEnhancer = fontRenderer(mountNode)

const renderer = createRenderer({
  enhancers: [ fontEnhancer ]
})
```

###### Server
To get the static CSS markup for both renderers can be achieved using the `renderer.fontRenderer` to generate the `@font-face` markup.

```javascript
import { createRenderer } from 'alef'
import fontRenderer from 'alef-font-renderer'

const renderer = createRenderer({
  enhancers: [ fontRenderer() ]
})

const CSS = renderer.renderToString()
const fontCSS = renderer.fontRenderer.renderToString()
```

## License
Alef is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
