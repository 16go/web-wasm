package runtime

var rtInstance runtime

func init() {
	rtInstance = runtime{}
	rtInstance.exportedFn = make([]JsWrapper, 0)
}
