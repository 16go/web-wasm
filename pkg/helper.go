package pkg

import (
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
