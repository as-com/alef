# alef-plugin-unit


<img alt="npm downloads" src="https://img.shields.io/npm/dm/alef-plugin-unit.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-1.53kb-brightgreen.svg">

Always writing length values as string with a value applied seems not like the JavaScript way to do it. You can also use mathematics to process number values. <br>
It is aware of unitless properties such as `lineHeight` and also adds units to multiple values inside an array.

## Installation
```sh
yarn add alef-plugin-unit
```
You may alternatively use `npm i --save alef-plugin-unit`.



## Usage
Make sure to read the documentation on [how to use plugins](http://alef.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'alef'
import unit from 'alef-plugin-unit'

const renderer = createRenderer({
  plugins: [ unit() ]
})
```

### Configuration
##### Parameters
| Parameter | Value | Default | Description |
| --- | --- | --- | --- |
| unit | `ch`, `em`, `ex`, `rem`, `vh`, `vw`, `vmin`, `vmax`, `px`, `cm`, `mm`, `in`, `pc`, `pt`, `mozmm` | `px` | unit which gets applied |
| unitPerProperty | *(Object)* | `{}` | Default units per property |

##### Example
```javascript
import { createRenderer } from 'alef'
import unit from 'alef-plugin-unit'

const unitPlugin = unit('em', {
  margin: '%',
  fontSize: 'pt'
})

const renderer = createRenderer({
  plugins: [ unitPlugin ]
})
```


## Example
Using the above example code:

#### Input
```javascript
{
  width: 25,
  lineHeight: 1.4,
  height: '53',
  fontSize: 15,
  margin: 10
}
```
#### Output
```javascript
{
  width: '25em',
  lineHeight: 1.4,
  height: '53em',
  fontSize: '15pt',
  margin: '10%'
}
```

## License
Alef is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
