# alef-monolithic

<img alt="npm downloads" src="https://img.shields.io/npm/dm/alef-monolithic.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-1.22kb-brightgreen.svg">

The monolithic enhancer will use unique class names instead of atomic ones.
These generated class names are not re-usable like the atomic design but allows you to debug and modify styles with ease.
Every ruleset will have it's own unique class - this means that a new class will be generated if you are using props and they change. If you want to fix the class name, you can add property `className` into your rule set. This can be useful if you want to generate an external stylesheet that's human readable, re-usable and can be used on non-JS projects.

## Installation
```sh
yarn add alef-monolithic
```
You may alternatively use `npm i --save alef-monolithic`.

## Usage

```javascript
import { createRenderer } from 'alef'
import monolithic from 'alef-monolithic'

const renderer = createRenderer({
  enhancers: [ monolithic() ]
})

const rule = () => ({
  className: 'custom',
  color: 'red'
})

renderer.renderRule(rule)
```

outputs

```css
.custom {
  color: red
}
```

if `className` property is not used, the output will be

```css
.137u7ef {
  color: red
}
```

`137u7ef` is a hash based on rule properties (`color: red` in this case).

### Configuration
##### Options
| Option | Value | Default | Description |
| --- | --- | --- | --- |
| `prettySelectors` | *(boolean)* | `false` | use pretty selectors in development |

If you are using `prettySelectors` with plain Alef rules it will add the `rule.name` to the className e.g.

> Note: anonymous functions will still only use the hash!

```javascript
import { createRenderer } from 'alef'
import monolithic from 'alef-monolithic'

const renderer = createRenderer({
  enhancers: [ monolithic({ prettySelectors: true }) ]
})

const redText = () => ({
  color: 'red'
})

renderer.renderRule(redText) // => redText_137u7ef
```
```css
.redText_137u7ef {
  color: red
}
```

If you use it together with `createComponent` from `react-alef`, `preact-alef` or `inferno-alef`, it will also add the component type or displayName to the rule. e.g.

```javascript
import { createComponent } from 'react-alef'

const Button = () => ({
  color: 'red'
})

const Comp = createComponent(Button)

<Button />
// => <div class="Button_div__137u7ef"></div>

const ExtendedButton = () => ({
  backgroundColor: 'blue'
})

const Comp2 = createComponent(ExtendedButton, Button)

<Comp2 />
// => <div class="ExtendedButton_Button__xxxxx"></div>
```


## License
Alef is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
