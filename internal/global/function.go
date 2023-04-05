package global

import (
	"syscall/js"
)

var FuncConstructor js.Value

type Func struct {
	js.Value
}

func init() {
	FuncConstructor = js.Global().Get("Function")
}

func NewFunction(args ...js.Value) Func {
	fn := Func{FuncConstructor.New(args)}
	return fn
}

func (f Func) Bind(this js.Value) Func {
	f.Call("bind", this)
	return f
}
