Builders
=========

This is a **very early** exploration of an extension to the JS language to enable a [DSL](https://medium.com/@daveford/80-of-my-coding-is-doing-this-or-why-templates-are-dead-b640fc149e22) designed to manipulate the DOM, highly inspired by [Kotlin builders](https://kotlinlang.org/docs/reference/type-safe-builders.html) (i.e. they look ilke {}-trees rather than XML).

It is designed to intermingle well with [CSS in JS](https://speakerdeck.com/vjeux/react-css-in-js) and [HTML in JS](https://facebook.github.io/react/docs/introducing-jsx.html).

Like Kotlin, it is designed to enable going back and fourth between the declarative code and the full set of imperative code (statements in addition to expressions).

You can find a good analysis of alternatives [here](https://medium.com/@daveford/80-of-my-coding-is-doing-this-or-why-templates-are-dead-b640fc149e22).

This is currently prototyped as a transpiler. You can find a lot of examples [here](test/runtime.js).

# Example

The idea is to extend the JS syntax to enable declaring tree-like structures and intermingling imperative code back and fourth. Its most simple invocation returns an Element:

```javascript
let head = span { "Hello World!" };
```

The general trick in the language is to enable {} expressions to follow functions and embed that as the last argument of the function. For example, the example above is isomorphic to the code below:

```javascript
let head = span(() => { "Hello World!" });
```

Along the lines of [Kotlin builders](https://kotlinlang.org/docs/reference/type-safe-builders.html)'s, what goes inside the ```{}``` is valid JS code, so you can execute real statements. For example:

```javascript
let body = div {
  // This is JS scope, so comments are valid!

  // Like, for real JS. E.g. if statements are executed.
  if (document.cookie) {
    "Welcome back!"
  }

  // Same goes for for loops
  for (let page of ["about", "contact"]) {
    a({href: `${page}.html`}) { page }
  }
  
  // Attributes are passed as ({key: value}) and can contain JS too.
  div({onclick: function() { alert("Hi!"); }}) {
    click me!
  } 
  
  // CSS in JS!
  let COMMON_WIDTH = 1000;
  span({
    style : {  
      width: COMMON_WIDTH, // imperative css!
    }
  }) {
    hello world!
  }
}
```

It plays well with components-like frameworks:

```javascript
class MyComponent extends mixin(Component, React) {
  constructor() {
    this.name = "Sam Goto";
  }
  render() {
    return span { `Welcome back, ${this.foo}!` }
  }
}
```

# Installation

  `npm install -g @docscript/docscript`
  

# Tests

  `npm test`

# Status

  You really don't want to use this right now. Very early prototype.

# Related work

* JSX
* Kotlin typed builders
* Elm
* Hyperscript
* json-ish
* Om
* Flutter
* Anko layouts
* E4X
* [Curl](https://en.wikipedia.org/wiki/Curl_(programming_language))
* [JFX Script](https://en.wikipedia.org/wiki/JavaFX_Script)
* [JXON](https://developer.mozilla.org/en-US/docs/Archive/JXON)
* [Protocol Buffers](https://developers.google.com/protocol-buffers/docs/overview)
* [JSON-ish](http://blog.sgo.to/2015/09/json-ish.html)
