package global

import (
	"github.com/16go/web-wasm/internal"
	"github.com/16go/web-wasm/pkg/z"
	"syscall/js"
)

var objRef js.Value

type Object struct{}

func init() {
	objRef = js.Global().Get("Object")
}

func (Object) Assign(target z.JsObject, sources ...z.JsObject) js.Value {
	args := internal.VariadicPrependFirstArg[z.JsObject, z.JsObject](target, sources...)
	return objRef.Call("assign", args...).Type()
}

func (Object) Freeze(target z.JsObject) js.Value {
	return objRef.Call("freeze", target)
}
