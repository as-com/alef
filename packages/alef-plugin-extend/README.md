# alef-plugin-extend


<img alt="npm downloads" src="https://img.shields.io/npm/dm/alef-plugin-extend.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.60kb-brightgreen.svg">

Allows styles to be extended with other style objects. Supports a condition-based API.

## Installation
```sh
yarn add alef-plugin-extend
```
You may alternatively use `npm i --save alef-plugin-extend`.

## Usage
Make sure to read the documentation on [how to use plugins](http://alef.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'alef'
import extend from 'alef-plugin-extend'

const renderer = createRenderer({
  plugins: [ extend() ]
})
```

## Example

### `extend: styleObject`
#### Input
```javascript
{
  color: 'red',
  extend: { backgroundColor: 'blue' }
}
```
#### Output
```javascript
{
  color: 'red',
  backgroundColor: 'blue'
}
```

### `extend: { condition, styleObject }`
#### Input
```javascript
{
  color: 'red',
  extend: {
    condition: props.bg === true,
    style: { backgroundColor: 'blue' }
  }
}
```
#### Output
Rendered using `{ bg: true }` as `props`:
```javascript
{
  color: 'red',
  backgroundColor: 'blue'
}
```
Rendered using `{ bg: false }` as `props`
```javascript
{
  color: 'red'
}
```

### `extend: [...]`
You can also mix basic and conditional extending.
It will extend the styles from left to right.
```javascript
{
  color: 'red',
  extend: [{
    fontSize: '12px',
    lineHeight: 1.5
  }, {
    condition: props.bg === true,
    style: { backgroundColor: 'blue' }
  }, {
    lineHeight: 1.2
  }]
}
```
#### Output
Using `{ bg: true }` as `props`:
```javascript
{
  color: 'red',
  fontSize: '12px',
  lineHeight: 1.2,
  backgroundColor: 'blue'
}
```

## License
Alef is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
