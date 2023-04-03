package global

import (
	"github.com/16go/web-wasm/internal"
	"syscall/js"
)

var fnRef js.Value

type FunctionTyp struct{}

func init() {
	fnRef = js.Global().Get("Function")
}

func (FunctionTyp) Bind(this js.Value, fnArgs ...js.Value) js.Value {
	args := internal.VariadicPrependFirstArg[js.Value, js.Value](this, fnArgs...)
	return fnRef.Call("bind", args...)
}
