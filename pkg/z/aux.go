package z

import "syscall/js"

//type (
//	JsObject map[string]any
//	JsFunc   = func(this js.Value, args []js.Value) any
//)
//
//type JsObjectProperty struct {
//	name string
//	val  js.Value
//}
//
//func (p JsObjectProperty) Name() string {
//	return
//}

type (
	ObjectTyp map[string]any
)

type WrapperArgsValidatorInterface interface {
}

type RuntimeInterface interface {
	ExportFn()
}

type MutableInterface interface {
	Set(name string, val any)
}

type OptionInterface func(target any)

type ExportedFn func(...js.Value) any
