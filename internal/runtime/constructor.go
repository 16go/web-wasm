package runtime

func NewObject(props ...JsObjectProperty) JsObject {
	obj := make(JsObject)
	for _, prop := range props {
		obj[prop.Name()] = prop.Value()
	}
	return obj
}
