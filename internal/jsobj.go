package internal

import (
	"github.com/16go/web-wasm/pkg"
	"syscall/js"
)

type (
	jsObj     map[string]any
	jsObjProp struct {
		name  string
		value any
	}
)

func SetGlobal(key string, v any) {
	js.Global().Set(key, v)
}

func NewJsObjProp(name string, val any) jsObjProp {
	return jsObjProp{name, val}
}

func (p jsObjProp) Name() string {
	return p.name
}

func (p jsObjProp) Value() any {
	return p.value
}

func NewJsObj() jsObj {
	return make(jsObj)
}

func (o jsObj) AddProp(prop pkg.JsObjPropInterface) {
	o[prop.Name()] = prop.Value()
}

func (o jsObj) RemoveProp(name string) {
	o[name] = js.Undefined()
}
