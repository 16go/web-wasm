package main

import (
	"github.com/16go/web-wasm/pkg"
	"github.com/16go/web-wasm/pkg/z"
	"syscall/js"
)

type dummyApi struct {
}

func (dummyApi) Info() z.ApiInfoInterface {
	return pkg.ApiInfo{
		Name:     "Foo",
		MajorVer: 1,
		MinorVer: 0,
	}
}

func (dummyApi) NewInstance() any {
	api := new(dummyApi)
	js.Global().Get("console").Call("log", "mew instance")
	return api
}

func main() {
	pkg.Runtime().AddApi(dummyApi{})
	pkg.Runtime().ExportApi()
	js.Global().Set("myvar", 2)
	select {}
}
