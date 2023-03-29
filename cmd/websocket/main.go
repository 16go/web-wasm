package main

import (
	"fmt"
)

func main() {
	a := 0
	b := 1
	_ = b / a
	fmt.Print("Hello from Go")
	//pkg.ExportGlobalFn("Wasm_Foo", func(args ...js.Value) {
	//	url := args[0].String()
	//	websocket.NewEndpoint(url)
	//})
	//..
	select {}
}
