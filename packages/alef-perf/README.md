# fela-perf

<img alt="npm downloads" src="https://img.shields.io/npm/dm/fela-perf.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.47kb-brightgreen.svg">

Performance devTool to be used with Fela. It logs elapsed time during render cycles.

## Installation
```sh
yarn add fela-perf
```
You may alternatively use `npm i --save fela-perf`.

## Usage
```javascript
import { createRenderer } from 'fela'
import perf from 'fela-perf'

const renderer = createRenderer({
  enhancers: [ perf() ]
})
```

## Example
<img width="400" src="preview.png">

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
