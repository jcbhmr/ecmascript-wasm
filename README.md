# JavaScript bindings for WebAssembly

🔌 WIT definitions for ECMAScript types

## Usage

```wit
package example:hello;

interface greet {
  func greet(name: string);
}

world hello {
    include jcbhmr:ecmascript-wasm/imports@0.3.0;
    export greet;
}
```

```rs
fn greet(name: String) {
    let 
}
```