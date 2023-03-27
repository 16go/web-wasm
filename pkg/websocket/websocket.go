package websocket

import (
	ws "github.com/16go/web-wasm/internal/websocket"
	"github.com/16go/web-wasm/pkg/z"
)

var _ z.WebSocketInterface = ws.WebSocketApi{}

func NewEndpoint(url string, opts ...z.OptionInterface) z.WebSocketEndpointInterface {
	return ws.WebSocketApi{}.NewEndpoint(url, opts...)
}
