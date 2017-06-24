# alef-plugin-named-media-query


<img alt="npm downloads" src="https://img.shields.io/npm/dm/alef-plugin-named-media-query.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.49kb-brightgreen.svg">

This plugin is basically a convenient plugin for more readable code and better maintenance.<br>
It enables the use of named media query keys.

## Installation
```sh
yarn add alef-plugin-named-media-query
```
You may alternatively use `npm i --save alef-plugin-named-media-query`.


## Usage
Make sure to read the documentation on [how to use plugins](http://alef.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'alef'
import namedMediaQuery from 'alef-plugin-named-media-query'

const renderer = createRenderer({
  plugins: [ namedMediaQuery() ]
})
```

### Configuration
##### Parameters
| Parameter | Value | Default | Description |
| --- | --- | --- | --- |
| mediaQueryMap | *(Object)* | `{}` | An object with shorthand-mediaQuery pairs |

##### Example
```javascript
import { createRenderer } from 'alef'
import namedMediaQuery from 'alef-plugin-named-media-query'

const namedMediaQueryPlugin = namedMediaQuery({
  desktop: '@media (min-width: 1024px)',
  tablet: '@media (min-width: 768px)'
})

const renderer = createRenderer({
  plugins: [ namedMediaQueryPlugin ]
})
```

## Example
Using the above example code:

#### Input
```javascript
{
  color: 'red',
  desktop: {
    color: 'blue'
  }
}
```
#### Output
```javascript
{
  color: 'red',
  '@media (min-width: 1024px)': {
    color: 'blue'
  }
}
```

## License
Alef is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
