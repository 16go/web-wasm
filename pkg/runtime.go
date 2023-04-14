package pkg

import (
	"github.com/16go/web-wasm/internal/global"
	"github.com/16go/web-wasm/pkg/z/web"
	"syscall/js"
)

var (
	rt *runtime
)

type runtime struct {
	apiList []web.ApiInterface
}

type (
	ApiMethod     func(...any) any
	ApiMethodsMap map[string]ApiMethod
)

type ApiInfo struct {
	Name               string
	MajorVer, MinorVer int
}

func (inf ApiInfo) GetName() string {
	return inf.Name
}

func (inf ApiInfo) GetMajorVersion() int {
	return inf.MajorVer
}

func (inf ApiInfo) GetMinorVersion() int {
	return inf.MinorVer
}

func (inf ApiInfo) toObject() global.Object {
	info := global.NewObject()
	info.AddProperty("Name", inf.Name)
	info.AddProperty("MajorVer", inf.MajorVer)
	info.AddProperty("MinorVer", inf.MinorVer)
	return global.Object{}.Freeze(info)
}

type api struct {
	methods ApiMethodsMap
	info    ApiInfo
}

func init() {
	rt = new(runtime)
	rt.apiList = make([]web.ApiInterface, 0)
}

func Runtime() *runtime {
	return rt
}

func (r *runtime) AddApi(api web.ApiInterface) {
	r.apiList = append(r.apiList, api)
}

// ExportApi exports all available APIs to the worker global space.
func (r *runtime) ExportApi() {
	l := len(r.apiList)
	if l == 0 {
		panic("trying to export an empty API collection")
	}
	arr := global.NewArray()
	for _, v := range r.apiList {
		apiObj := global.NewObject()
		infoObj := v.Info().(ApiInfo).toObject()
		apiObj.AddProperty("Info", infoObj.Value())
		apiObj.AddFunc("newInstance", func(a ...any) any {
			return v.NewInstance()
		})
		arr.Push(apiObj.Value())
	}
	js.Global().Set("ApiList", arr.Value())
}
