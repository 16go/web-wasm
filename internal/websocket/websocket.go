//go:build js && wasm

package websocket

import (
	"fmt"
	"github.com/16go/web-wasm/pkg"
	"github.com/16go/web-wasm/pkg/z"
	"sync/atomic"
	"syscall/js"
)

type WebSocketApi struct{}

type endpoint struct {
	ws            js.Value
	bytesReceived uint64
	bytesSent     uint64
	onMsgFn       z.WS_OnMessageHandlerFn
	onOpenFn      z.WS_OnOpenHandlerFn
	onCloseFn     z.WS_OnCloseHandlerFn
	onErrFn       z.WS_OnErrorHandlerFn
	isClosed      bool
}

type Option func(ep *endpoint)

func WithOnMessageHandler(h z.WS_OnMessageHandlerFn) z.OptionInterface {
	return func(ep any) {
		ep.(*endpoint).onMsgFn = h
	}
}

func WithOnOpenHandler(h z.WS_OnOpenHandlerFn) z.OptionInterface {
	return func(ep any) {
		ep.(*endpoint).onOpenFn = h
	}
}

// NewEndpoint creates a new WebSocket instance.
// Throws DOMException if provided endpoint URL is not valid.
// See https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket for the details.
func (WebSocketApi) NewEndpoint(url string, opts ...z.OptionInterface) z.WebSocketEndpointInterface {
	ep := new(endpoint)
	// Assign options
	for _, opt := range opts {
		opt(ep)
	}
	fmt.Printf("foo %v", js.Global().Get("Websocket"))

	// Open a new connection to the given endpoint.
	//ep.ws = js.Global().Get("WebSocket").New(url)
	//// Message handler.
	//msgHandler := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
	//	if ep.onMsgFn != nil {
	//		// The first argument is the message event
	//		msgEvt := event.NewMessageEvent(args[0])
	//		payload := []byte(msgEvt.GetData())
	//		ep.onMsgFn(payload, msgEvt)
	//	}
	//	return nil
	//})
	//ep.ws.Set("onmessage", msgHandler)
	//// A new connection handler.
	//openHandler := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
	//	if ep.onOpenFn != nil {
	//		genericEvt := event.FromJsVal(args[0])
	//		ep.onOpenFn(genericEvt)
	//	}
	//	return nil
	//})
	//ep.ws.Set("onopen", openHandler)
	//// Connection closed handler.
	//closeHandler := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
	//	if ep.onCloseFn != nil {
	//		closeEvt := event.NewCloseEvent(args[0])
	//		ep.onCloseFn(closeEvt)
	//	}
	//	return nil
	//})
	//ep.ws.Set("onclose", closeHandler)
	//// On error handler.
	//errHandler := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
	//	if ep.onErrFn != nil {
	//		genericEvt := event.FromJsVal(args[0])
	//		ep.onErrFn(genericEvt)
	//	}
	//	return nil
	//})
	//ep.ws.Set("onerror", errHandler)
	return ep
}

func (ep *endpoint) Send(data []byte) {
	arrBuffer := pkg.ByteSliceToArrayBuffer(data)
	atomic.AddUint64(&ep.bytesSent, uint64(arrBuffer.Length()))
	ep.ws.Call("send", arrBuffer)
}

func (ep *endpoint) close(extra ...any) {
	ep.ws.Call("close", extra...)
	ep.isClosed = true
}

func (ep *endpoint) Close() {
	ep.close()
}

func (ep *endpoint) IsClosed() bool {
	return ep.isClosed
}

func (ep *endpoint) CloseWithDetails(code int, reason string) {
	errMap.checkCustomCode(code)
	ep.close(code, reason)
}

func (ep *endpoint) GetBytesReceived() int {
	return int(ep.bytesReceived)
}

func (ep *endpoint) GetBytesSent() int {
	return int(ep.bytesSent)
}
