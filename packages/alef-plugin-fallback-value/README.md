# fela-plugin-fallback-value


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-fallback-value.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-1.05kb-brightgreen.svg">

Sometimes you want to provide alternative values also know as *fallback values*. <br>
For example in Internet Explorer 8 there is no `rgba` compatibility for colors which means just passing *e.g. `color: rgba(0, 0, 0, 0.5)`* would not be applied correctly.
By passing an array of values you can provide fallback values.

## Installation
```sh
yarn add fela-plugin-fallback-value
```
You may alternatively use `npm i --save fela-plugin-fallback-value`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import fallbackValue from 'fela-plugin-fallback-value'

const renderer = createRenderer({
  plugins: [ fallbackValue() ]
})
```

## Example

#### Input
```javascript
{
  color: [ 'rgba(0, 0, 0, 0.5)', '#ccc']
}
```
#### Output
```javascript
{
  color: 'rgba(0, 0, 0, 0.5);color:#ccc'
}
```
which is similar to the following CSS code:
```CSS
{
	color: rgba(0, 0, 0, 0.5);
	color: #ccc
}
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
