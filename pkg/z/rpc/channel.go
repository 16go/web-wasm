package rpc

import "github.com/16go/web-wasm/pkg/z"

type ChannelOptionsInterface interface {
	// Throttle throttles sending of client messages.
	Throttle(ms int)
	// Debounce
	Debounce(ms int)
	MaxMessageSize(int) z.OptionInterface
	ReadTimeout(int) z.OptionInterface
	WriteTimeout(int) z.OptionInterface
}

type ChannelInterface interface {
	Send(MessageInterface)
	OnMessage(EventListenerFn)
	OnError(EventListenerFn)
}
