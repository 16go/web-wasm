package z

type (
	WS_OnOpenHandlerFn    func(EventInterface)
	WS_OnCloseHandlerFn   func(CloseEventInterface)
	WS_OnMessageHandlerFn func([]byte, MessageEventInterface)
	WS_OnErrorHandlerFn   func(EventInterface)
)

type WebSocketInterface interface {
	NewEndpoint(url string, opts ...OptionInterface) WebSocketEndpointInterface
}

type WebSocketEndpointInterface interface {
	GetBytesReceived() int
	GetBytesSent() int
	Send(data []byte)
	Close()
	IsClosed() bool
}
