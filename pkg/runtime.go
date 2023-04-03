package pkg

import (
	"fmt"
	"github.com/16go/web-wasm/internal/global"
	"github.com/16go/web-wasm/pkg/z"
	"syscall/js"
)

type runtime struct {
	//exportedFn []JsWrapper
}

type (
	ApiDictionary map[string]js.Func
)

type apiInfo struct {
}

type api struct {
	dic  ApiDictionary
	info apiInfo
}

func (r *runtime) ExportApi(key string, dic ApiDictionary) {
	ref := js.Global().Get(key)
	if !ref.IsNull() || !ref.IsUndefined() {
		panic(fmt.Sprintf("API export: a global object with the given key '%s' already exists", key))
	}
	api := make(z.JsObject, len(dic))
	for k, v := range dic {
		apip[v]
	}
	global.Object{}.Freeze(api)
	js.Global().Set(key, api)
}
