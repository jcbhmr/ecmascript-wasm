# JavaScript bindings for WebAssembly

🔌 WIT definitions for [ECMAScript](https://tc39.es/ecma262/multipage/) types

<p align=center>
  TODO: Image here
</p>

## Installation

TODO: Clarify installation instructions

```sh
wkg wit fetch
```

## Usage

TODO: Add usage instructions \
TODO: Describe the type hierarchy and how to upcast/downcast things

## Development

Dependencies:

- [wkg](https://github.com/bytecodealliance/wasm-pkg-tools)

TODO: Describe how to test the WIT definitions for validity \
TODO: Provide some examples on how to use these WIT definitions in `examples/`


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
use wajsi::types::{get_global_object, Value};

let global = get_global_object();
let console = global.get(Value::from_string("console".into())).to_object().expect("'console' is not an object");
console.call(Value::from_string("log".into()), vec![Value::from_string("%s is #%d in queue.".into()), Value::from_string("Alan Turing".into()), Value::from_u32(42)]);
```

## Development

Dependencies:

- [wkg](https://github.com/bytecodealliance/wasm-pkg-tools)

This is **just the WIT definitions** for the `jcbhmr:ecmascript` interfaces. There is no runtime code here.
