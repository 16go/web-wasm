package main

import (
	"github.com/16go/web-wasm/pkg"
	"github.com/16go/web-wasm/pkg/websocket"
	"syscall/js"
)

func main() {
	pkg.ExportGlobalFn("Wasm_Foo", func(args ...js.Value) {
		url := args[0].String()
		websocket.NewEndpoint(url)
	})
	//..
	select {}
}
