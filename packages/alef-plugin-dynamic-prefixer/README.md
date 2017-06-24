# alef-plugin-dynamic-prefixer


<img alt="npm downloads" src="https://img.shields.io/npm/dm/alef-plugin-dynamic-prefixer.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-10.29kb-brightgreen.svg">

Uses [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) to add vendor prefixes by evaluating the `userAgent`.

**Requires to use [alef-plugin-fallback-value](../alef-plugin-fallback-value/) afterwards** in order to resolve alternative prefix values which get returned as an array by default.

## Installation
```sh
yarn add alef-plugin-dynamic-prefixer
```
You may alternatively use `npm i --save alef-plugin-dynamic-prefixer`.

## Usage
Make sure to read the documentation on [how to use plugins](http://alef.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'alef'
import dynamicPrefixer from 'alef-plugin-dynamic-prefixer'

const renderer = createRenderer({
  plugins: [ dynamicPrefixer() ]
})
```


### Configuration
It can be configured using the same options as [inline-style-prefixer's Prefixer](https://github.com/rofrischmann/inline-style-prefixer/blob/master/docs/API.md#configuration).

```javascript
import { createRenderer } from 'alef'
import dynamicPrefixer from 'alef-plugin-dynamic-prefixer'

const dynamicPrefixerPlugin = dynamicPrefixer({
  userAgent: navigator.userAgent,
  keepUnprefixed: true
})

const renderer = createRenderer({
  plugins: [ dynamicPrefixerPlugin ]
})
```

## Example
Assuming we are using e.g. Chrome 25.

#### Input
```javascript
{
  transition: '200ms all linear',
  userSelect: 'none',
  boxSizing: 'border-box',
  display: 'flex',
  color: 'blue'
}
```
#### Output
```javascript
{
  transition: '200ms all linear',
  WebkitUserSelect: 'none',
  boxSizing: 'border-box',
  display: '-webkit-flex',
  color: 'blue'
}
```

## License
Alef is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
