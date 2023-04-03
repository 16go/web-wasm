package global

import (
	"github.com/16go/web-wasm/internal"
	"github.com/16go/web-wasm/pkg/z"
	"syscall/js"
)

var objRef js.Value

type ObjectTyp struct{}

func init() {
	objRef = js.Global().Get("Object")
}

func (ObjectTyp) Assign(target z.ObjectTyp, sources ...z.ObjectTyp) js.Value {
	args := internal.VariadicPrependFirstArg[z.ObjectTyp, z.ObjectTyp](target, sources...)
	return objRef.Call("assign", args...).Type()
}
