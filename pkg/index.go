package pkg

import (
	pkgws "github.com/16go/web-wasm/pkg/websocket"
)

type (
	WebSocketApi = pkgws.Api
)

type WebApi struct {
	WebSocketApi
}
