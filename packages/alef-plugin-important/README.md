# alef-plugin-important


<img alt="npm downloads" src="https://img.shields.io/npm/dm/alef-plugin-important.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.52kb-brightgreen.svg">

Adds `!important` to every declaration value. This helps to force specificity over third-party libraries.

## Installation
```sh
yarn add alef-plugin-important
```
You may alternatively use `npm i --save alef-plugin-important`.


## Usage
Make sure to read the documentation on [how to use plugins](http://alef.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'alef'
import important from 'alef-plugin-important'

const renderer = createRenderer({
  plugins: [ important() ]
})
```

## Example
#### Input
```javascript
{
  width: '25px',
  display: [ '-webkit-flex', 'flex' ],
  fontWeight: 'normal'
}
```
#### Output
```javascript
{
  width: '25px!important',
  display: [ '-webkit-flex!important', 'flex!important' ],
  fontWeight: 'normal!important'
}
```

## License
Alef is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
