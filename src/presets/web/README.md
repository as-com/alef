# alef-preset-web

A Alef plugin preset for web applications.<br>
It contains everything you need to start building cross-browser compatible apps.

#### Contains (exact order)
* [alef-plugin-extend](../alef-plugin-extend/)
* [alef-plugin-prefixer](../alef-plugin-prefixer/)
* [alef-plugin-fallback-value](../alef-plugin-fallback-value/)
* [alef-plugin-lvha](../alef-plugin-lvha/)
* [alef-plugin-unit](../alef-plugin-unit/)


## Installation
```sh
yarn add alef-preset-web
```
You may alternatively use `npm i --save alef-preset-web`.


## Usage
Simply use the spread operator to add the preset.

```javascript
import { createRenderer } from 'alef'
import webPreset from 'alef-preset-web'

const renderer = createRenderer({
  plugins: [
    ...webPreset,
    // other plugins
  ]
})
```

## License
Alef is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
