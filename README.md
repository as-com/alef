# Alef

Alef is a fast and modular library to handle styling in JavaScript.<br>
It is dynamic by design and renders your styles depending on your application state.

It generates CSS and therefore supports all common CSS features such as media queries, pseudo classes, keyframes and font-faces. It also renders on server-side with ease and ships with a powerful plugin API adding e.g. [automatic vendor prefixing](packages/alef-plugin-prefixer) or [fallback value](packages/alef-plugin-fallback-value) support.

Alef can be used with [React](https://github.com/as-com/alef/tree/master/packages/react-alef) or with any other view library. React Native support has been removed.

## Improvements from Fela
* Entire codebase converted to TypeScript
* Shorter classnames generated using a Base64 alphabet (instead of just numbers)
* Will no longer generate problematic classnames (such as those likely to be blocked by ad-blockers)
* Performance enhancements (including API-breaking changes)
* Removed support for React Native
* Removed some Angular stuff that I don't care about
* Uses tabs for indentation

<!--<img alt="TravisCI" src="https://travis-ci.org/as-com/alef.svg?branch=master"> <a href="https://codeclimate.com/github/as-com/alef/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/as-com/alef/badges/coverage.svg"></a> <img alt="npm downloads" src="https://img.shields.io/npm/dm/alef.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-3.16kb-brightgreen.svg"> <img alt="npm version" src="https://badge.fury.io/js/alef.svg"> <a href="https://gitter.im/as-com/alef"><img alt="Gitter" src="https://img.shields.io/gitter/room/as-com/alef.svg"></a>-->

## Installation
<!--```sh
yarn add alef
```
You may alternatively use `npm i --save alef`.-->
We're busy refactoring and hitting the delete key, so you can't install it (yet).

## Features
* Dynamic styling
* Universal rendering
* Dead code elimination
* High performance
* Minimal CSS output
* Framework-agnostic
* Pseudo classes & Media queries
* Child & Attribute selectors
* Vendor prefixing
* Component theming
* Many useful plugins
* Local namespace

## The Gist
Alef is all about rendering styles, especially so called rules. A universal renderer will help us to render styles of all kind. Once rendered into a DOM node, a change listener will subscribe to changes and automatically add new rules.<br>
The following example illustrates the key parts of Alef though it only shows the very basics.

```javascript
import { createRenderer } from 'alef'
import { render } from 'alef-dom'

// rules are just plain functions of props
// returning a valid object of style declarations
const rule = props => ({
  fontSize: props.fontSize + 'px',
  marginTop: props.margin ? '15px' : 0,
  color: 'red',
  lineHeight: 1.4,
  ':hover': {
    color: 'blue',
    fontSize: props.fontSize + 2 + 'px'
  },
  // nest media queries and pseudo classes
  // inside the style object
  '@media (min-height: 300px)': {
    backgroundColor: 'gray',
    ':hover': {
      color: 'black'
    }
  }
})

// creates a new renderer to render styles
const renderer = createRenderer()

// rendering the rule returns a className reference
// which can be attached to any element
const className = renderer.renderRule(rule, { fontSize: 12 })

// it uses atomic css design to reuse styles
// on declaration base and to keep the markup minimal
console.log(className) // => a b c d e f h

// renders all styles into the DOM
render(renderer)
```

## Documentation
The [Fela documentation](http://fela.js.org) should be a good start, although don't actually try to use Alef unless you are me.
<!--* [Introduction](http://alef.js.org/docs/Introduction.html)
* [Basics](http://alef.js.org/docs/Basics.html)
* [Advanced](http://alef.js.org/docs/Advanced.html)
* [Usage Guides](http://alef.js.org/docs/UsageGuides.html)
* [Recipes](http://alef.js.org/docs/Recipes.html)
* [API Reference](http://alef.js.org/docs/API.html)
* [Troubleshooting](http://alef.js.org/docs/Troubleshooting.html)
* [FAQ](http://alef.js.org/docs/FAQ.html)
* [Feedback](http://alef.js.org/docs/Feedback.html)
* [Thanks](http://alef.js.org/docs/Thanks.html)-->

<!--## Posts
* [**Style as a Function of State**](https://medium.com/@rofrischmann/styles-as-functions-of-state-1885627a63f7#.6k6i4kdch)<br> - *by [@rofrischmann](https://twitter.com/rofrischmann)*
* [**CSS in JS: The Argument Refined**](https://medium.com/@steida/css-in-js-the-argument-refined-471c7eb83955#.3otvkubq4)<br> - *by [@steida](https://twitter.com/steida)*-->

<!--## Examples-->
<!--* [Alef + React](http://alef.js.org/docs/introduction/Examples.html#react) ([source](packages/example-react))
* [Alef + React Native](http://alef.js.org/docs/introduction/Examples.html#react-native) ([source](packages/example-react-native))
* [Alef + Preact](http://alef.js.org/docs/introduction/Examples.html#preact) ([source](packages/example-preact))
* [Alef + Inferno](http://alef.js.org/docs/introduction/Examples.html#inferno) ([source](packages/example-inferno))
* [Alef + Angular 2](http://alef.js.org/docs/introduction/Examples.html#angular-2) ([source](packages/example-angular2))
* [Alef + Next](https://github.com/zeit/next.js/tree/master/examples/with-alef)
* [Alef + HyperScript](https://github.com/ahdinosaur/hyper-alef#example)
* [Alef + Cycle](https://github.com/wcastand/cycle-alef-example)-->

<!--## Community
* [Aesthetic](https://github.com/milesj/aesthetic) - React style and theme layer with Alef support
* [cf-ui](https://github.com/cloudflare/cf-ui) - Cloudflare UI Framework
* [Este](https://github.com/este/este) - Starter kit for universal full–fledged React apps build with Alef
* [Kilvin](https://github.com/rofrischmann/kilvin) - Primitive React Layout Components with Alef
* [Tel Aviv](https://github.com/dustin-H/telaviv) - React Universal Rendering-->

<!--## Support-->
<!--Join us on [Gitter](https://gitter.im/as-com/alef). <br>
We highly appreciate any contribution.<br>
We also love to get feedback.-->

## Who's using Alef?
Nobody except for me...which should be a good thing.
<!--- [abilis](https://www.abilis.de)
- [BdP LV RPS](http://www.bdp-rps.de)
- [Cloudflare](https://www.cloudflare.com)
- [HelloFresh](https://www.hellofresh.de)
- [Kilix](http://kilix.fr)
- [MediaFire](https://m.mediafire.com)
- [N26](https://n26.com)
- [NinjaConcept](https://www.ninjaconcept.com)
- [Optisure](https://www.optisure.de)-->


## License
Alef is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created by @as-com, based on excellent work by [@rofrischmann](http://rofrischmann.de) and other contributors.
