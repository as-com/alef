# fela-plugin-isolation


<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-plugin-isolation.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.53kb-brightgreen.svg">

Adds style isolation to every rule by attaching `all: initial` to every class.

## Installation
```sh
yarn add fela-plugin-isolation
```
You may alternatively use `npm i --save fela-plugin-isolation`.


## Usage
Make sure to read the documentation on [how to use plugins](http://fela.js.org/docs/advanced/Plugins.html).

```javascript
import { createRenderer } from 'fela'
import isolation from 'fela-plugin-isolation'

const renderer = createRenderer({
  plugins: [ isolation() ]
})
```

### Configuration
##### Parameters
| Parameter | Value | Default | Description |
| --- | --- | --- | --- |
| exclude | *(Array*) | `[]` | CSS properties that will not be isolated |

##### Example
```javascript
import { createRenderer } from 'fela'
import isolation from 'fela-plugin-isolation'

const isolationPlugin = isolation({
  exclude: [
    'boxSizing',
    'display'
  ]
})

const renderer = createRenderer({
  plugins: [ isolationPlugin ]
})
```

## Example
Using the above example code:
#### Input
```javascript
{
  fontSize: 15,
  color: 'red'
}
```
#### Output
```javascript
{
  all: 'initial',
  boxSizing: 'inherit',
  display: 'inherit',
  fontSize: 15,
  color: 'red'
}
```

## Disable isolation
To disable style isolation for single rules, simply add the `isolation: false` property to that rule.

##### Example
```javascript
const rule = props => ({
  isolation: false,
  fontSize: 15,
  color: 'red'
})
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
