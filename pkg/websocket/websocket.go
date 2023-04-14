package websocket

import (
	ws "github.com/16go/web-wasm/internal/websocket"
	"github.com/16go/web-wasm/pkg/z/web"
)

var _ web.WebSocketInterface = ws.WebSocketApi{}

func NewEndpoint(url string, opts ...web.OptionInterface) web.WebSocketEndpointInterface {
	return ws.WebSocketApi{}.NewEndpoint(url, opts...)
}
