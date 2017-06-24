# alef-preset-dev

A Alef plugin preset for development.

> Do **not** use this preset in production!

#### Contains (exact order)
* [alef-plugin-logger](../alef-plugin-logger/)
* [alef-plugin-validator](../alef-plugin-validator/)


## Installation
```sh
yarn add alef-preset-dev
```
You may alternatively use `npm i --save alef-preset-dev`.


## Usage
Simply use the spread operator to add the preset.

```javascript
import { createRenderer } from 'alef'
import devPreset from 'alef-preset-dev'

const renderer = createRenderer({
  plugins: [
    // other plugins,
    ...devPreset
  ]
})
```

## License
Alef is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
