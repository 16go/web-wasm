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
	ApiMethod     func(...any) any
	ApiMethodsMap map[string]ApiMethod
)

type apiInfo struct {
	majorVer, minorVer int
}

type api struct {
	methods ApiMethodsMap
	info    apiInfo
}

func (r *runtime) NewApi(objKey string, methods ApiMethodsMap) {
	ref := js.Global().Get(objKey)
	if !ref.IsNull() || !ref.IsUndefined() {
		panic(fmt.Sprintf("API export: a global object with the given objKey '%s' already exists", objKey))
	}
	apiObj := make(z.JsObject)
	for k, v := range methods {
		apiObj[k] = js.FuncOf(func(this js.Value, args []js.Value) any {
			defer func() {
				if err := recover(); err != nil {

				}
			}()
			//global.Object{}.
			return nil
		})
	}
	js.Global().Set(objKey, global.Object{}.Freeze(apiObj))
}
