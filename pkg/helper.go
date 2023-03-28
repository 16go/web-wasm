package pkg

import (
	"github.com/16go/web-wasm/pkg/z"
	"syscall/js"
)

func ByteSliceToArrayBuffer(slice []byte) js.Value {
	// Create a typed array from the byte slice
	array := js.Global().Get("Uint8Array").New(len(slice))
	js.CopyBytesToJS(array, slice)

	// Get the underlying ArrayBuffer object
	buffer := array.Get("buffer")
	return buffer
}

func ExportGlobalFn(name string, fn z.ExportedFn) {
	expFn := js.FuncOf(func(this js.Value, args []js.Value) any {
		fn(args...)
		return nil
	})
	js.Global().Set(name, expFn)
}
