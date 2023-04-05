package global

import (
	"syscall/js"
)

var ArrayConstructor js.Value

type Array struct {
	jsval js.Value
}

func init() {
	ArrayConstructor = js.Global().Get("Array")
}

func (arr Array) Value() js.Value {
	return arr.jsval
}

func NewArray(args ...any) Array {
	arr := Array{jsval: ArrayConstructor.New(args...)}
	return arr
}

func (arr Array) Push(item js.Value) Array {
	arr.jsval.Call("push", item)
	return arr
}
