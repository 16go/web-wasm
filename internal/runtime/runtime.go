package runtime

import "syscall/js"

type (
	JsObject map[string]any
	JsFunc   = func(this js.Value, args []js.Value) any
)

type JsObjectProperty struct {
	name string
	val  js.Value
}

func (obj JsObject) Set(name string, val any) {
	obj[name] = val
}

func (prop JsObjectProperty) Name() string {
	return prop.name
}

func (prop JsObjectProperty) Value() js.Value {
	return prop.val
}
