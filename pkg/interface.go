package pkg

type JsObjInterface interface {
	AddProp(JsObjPropInterface)
	RemoveProp(name string)
}

type JsObjPropInterface interface {
	Name() string
	Value() any
}
