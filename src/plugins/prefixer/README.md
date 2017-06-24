# alef-plugin-prefixer


<img alt="npm downloads" src="https://img.shields.io/npm/dm/alef-plugin-prefixer.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-3.94kb-brightgreen.svg">

Uses [inline-style-prefixer/static](https://github.com/rofrischmann/inline-style-prefix-all) to add vendor prefixes to both property and value.

**Requires to use [alef-plugin-fallback-value](../alef-plugin-fallback-value/) afterwards** in order to resolve alternative prefix values which get returned as an array by default.

## Installation
```sh
yarn add alef-plugin-prefixer
```
You may alternatively use `npm i --save alef-plugin-prefixer`.


## Usage
Make sure to read the documentation on [how to use plugins](http://alef.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'alef'
import prefixer from 'alef-plugin-prefixer'

const renderer = createRenderer({
  plugins: [ prefixer() ]
})
```

## Example

#### Input
```javascript
{
  display: 'flex',
  appearance: 'none'
}
```
#### Output
```javascript
{
  display: [ 'webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex' ],
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none'
}
```

## License
Alef is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
