package websocket

import (
	"github.com/16go/web-wasm/internal/websocket"
	"github.com/16go/web-wasm/pkg/z/web"
)

func WithOnMessageHandler(h web.WS_OnMessageHandlerFn) web.OptionInterface {
	return websocket.WithOnMessageHandler(h)
}

func WithOnOpenHandler(h web.WS_OnOpenHandlerFn) web.OptionInterface {
	return websocket.WithOnOpenHandler(h)
}
