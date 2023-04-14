package z

import (
	"github.com/16go/web-wasm/pkg/z/web"
)

type ChannelOptionsInterface interface {
	// Throttle throttles sending of client messages.
	Throttle(ms int)
	// Debounce
	Debounce(ms int)
	MaxMessageSize(int) web.OptionInterface
	ReadTimeout(int) web.OptionInterface
	WriteTimeout(int) web.OptionInterface
}

type ChannelInterface interface {
	Send(MessageInterface)
	OnMessage(EventListenerFn)
	OnError(EventListenerFn)
}
