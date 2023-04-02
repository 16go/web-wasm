package main

import (
	"fmt"
	"github.com/16go/web-wasm/pkg"
	"github.com/16go/web-wasm/pkg/websocket"
	"github.com/16go/web-wasm/pkg/z"
	"syscall/js"
)

func main() {
	fmt.Print("Hello from Go")
	pkg.ExportGlobalFn("Go_WebSocket", func(args ...js.Value) any {
		url := args[0].String()
		args = args[1:]
		dd := args.([]z.OptionInterface)
		return websocket.NewEndpoint(url, args...)
	})
	select {}
}
