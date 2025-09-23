# WebAssembly JavaScript Interface

🟨 WIT definitions for [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) environments

<p align=center>
  TODO: Image here
</p>

## Installation

TODO: Clarify installation instructions

```sh
wkg wit fetch
```

## Usage

TODO: Add usage instructions

```rs
use wajsi::types::{get_global_object, Value, PropertyKey, Object, Callable};

let global = get_global_object();
let alert = global.get(PropertyKey::String("alert".into()));
let alert = match {
  Value::Object(x) => x,
  _ => panic!("'alert' should be an object"),
};
let alert = Callable::downcast(alert).expect("'alert' should be callable");
alert.call(None, vec![Value::String("Hello, World!".into())]).expect("'alert' should have succeeded");
```

TODO: Describe the type hierarchy and how to upcast/downcast things

## Development

Dependencies:

- [wkg](https://github.com/bytecodealliance/wasm-pkg-tools)

TODO: Describe how to test the WIT definitions for validity \
TODO: Provide some examples on how to use these WIT definitions in `examples/`
