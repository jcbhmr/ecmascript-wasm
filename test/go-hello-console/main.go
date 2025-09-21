//go:build tinygo && wasm

package main

import (
	"github.com/jcbhmr/wajsi/test/go-hello-console/jcbhmr/wajsi/types"
)

func main() {
	global := types.GetGlobalObject()
	console := global.Get(types.PropertyKeyString_("console"))
	_ = console
}
