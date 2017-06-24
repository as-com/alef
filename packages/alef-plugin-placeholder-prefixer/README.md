# alef-plugin-placeholder-prefixer


<img alt="npm downloads" src="https://img.shields.io/npm/dm/alef-plugin-placeholder-prefixer.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.64kb-brightgreen.svg">

Adds prefixes to `::placeholder` pseudo elements.

## Installation
```sh
yarn add alef-plugin-placeholder-prefixer
```
You may alternatively use `npm i --save alef-plugin-placeholder-prefixer`.


## Usage
Make sure to read the documentation on [how to use plugins](http://alef.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'alef'
import placeholderPrefixer from 'alef-plugin-placeholder-prefixer'

const renderer = createRenderer({
  plugins: [ placeholderPrefixer() ]
})
```

## Example

#### Input
```javascript
{
  color: 'red',
  '::placeholder': {
    color: 'green'
  }
}
```
#### Output
```javascript
{
  color: 'red',
  '::-webkit-input-placeholder': {
    color: 'green'
  },
  '::-moz-placeholder': {
    color: 'green'
  },
  ':-ms-input-placeholder': {
    color: 'green'
  },
  ':-moz-placeholder': {
    color: 'green'
  }
  '::placeholder': {
    color: 'green'
  }
}
```

## License
Alef is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
