package global

import (
	"github.com/16go/web-wasm/internal"
	"github.com/16go/web-wasm/pkg/z/web"
	"syscall/js"
)

var objectConstructor js.Value

type Object struct {
	jsval js.Value
}

func init() {
	objectConstructor = js.Global().Get("Object")
}

func NewObject(args ...any) Object {
	obj := Object{jsval: objectConstructor.New(args...)}
	return obj
}

func (o Object) Value() js.Value {
	return o.jsval
}

func (o Object) AddProperty(name string, value any) Object {
	o.jsval.Set(name, value)
	return o
}

func (o Object) AddFunc(name string, callback web.CallbackFn) Object {
	fn := js.FuncOf(func(this js.Value, args []js.Value) any {
		allArgs := internal.VariadicPrependFirstArg[js.Value, js.Value](this, args...)
		callback(allArgs...)
		return nil
	})
	// @todo Release fn
	o.jsval.Set(name, fn)
	return o
}

func (Object) Assign(target js.Value, sources ...js.Value) Object {
	args := internal.VariadicPrependFirstArg[js.Value, js.Value](target, sources...)
	newObj := Object{jsval: objectConstructor.Call("assign", args...)}
	return newObj
}

func (Object) Freeze(target Object) Object {
	objectConstructor.Call("freeze", target.Value())
	return target
}
