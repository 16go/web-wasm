package runtime

import (
	rt "github.com/16go/web-wasm/internal/runtime"
	"github.com/16go/web-wasm/pkg/z"
	"sync"
	"syscall/js"
)

type runtime struct {
	exportedFn []JsWrapper
}

type (
	WrapperArgsTyp = js.Value
	WrapperBodyFn  func(args...WrapperArgsTyp) any
)

type JsWrapper struct {
	jsFunc js.Func
	//thisRef JsObject
	body    func(args...WrapperArgsTyp) any
	release sync.Once
}

func (fn JsWrapper) Invoke() {

}

func export(target z.MutableInterface, name string, val any) {
	target.Set(name, val)
}

func NewTargetExport(targetName string, name string, val any) {
	var (
		target rt.JsObject
	)
	valTarget := js.Global().Get(targetName)
	if valTarget.IsNull() || valTarget.IsUndefined() {
		target = rt.NewObject()
		js.Global().Set(targetName, target)
	}
	export(target, name, val)
}

func NewGlobalExport(name string, val any) {
	target := js.Global()
	export(target, name, val)
}

func (r *runtime) Free() {
	for _, entry := range r.exportedFn {
		entry.release.Do(func() {
			entry.jsFunc.Release()
		})
	}
}

func (r *runtime) ExportFn(target, fnName string, body WrapperBodyFn) {
	wrapper := JsWrapper{
		body:    body,
		release: sync.Once{},
	}

	wrapper.jsFunc = js.FuncOf(func(this js.Value, args []js.Value) any {
		return nil
	})
	NewTargetExport(target, fnName, wrapper.jsFunc)
	r.exportedFn = append(r.exportedFn, wrapper)
}

func ExportGlobalFn(name string, fn z.ExportedFn) {
	expFn := js.FuncOf(z.JsFunc) any {
		fn(args...)
		return nil
	})
	js.Global().Set(name, expFn)
}

func Runtime() z.Run {
	return rtInstance
}