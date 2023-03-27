package websocket

import (
	"github.com/16go/web-wasm/internal/websocket"
	"github.com/16go/web-wasm/pkg/z"
)

func WithOnMessageHandler(h z.WS_OnMessageHandlerFn) z.OptionInterface {
	return websocket.WithOnMessageHandler(h)
}

func WithOnOpenHandler(h z.WS_OnOpenHandlerFn) z.OptionInterface {
	return websocket.WithOnOpenHandler(h)
}
