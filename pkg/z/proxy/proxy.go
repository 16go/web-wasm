package proxy

import "github.com/16go/web-wasm/pkg/z"

type (
	Handle          uintptr
	EventListenerFn func(EventInterface) any
)

type MessageInterface interface {
	Payload() []byte
}

type EventInterface interface {
	Data() any
}

//type ChannelOption func(...any) OptionInterface

//tpe ChannelOptionTyp [0]ChannelOption

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

type ServiceConstructorInterface interface {
	New(args ...any) ServiceInterface
}

type ServiceMethodsSetInterface interface {
}

type ServiceDescriptorInterface interface {
	Name() string
	MajorVersion() int
	MinorVersion() int
	Methods() ServiceMethodsSetInterface
}

type ServiceInterface interface {
	Handle() Handle
	Descriptor() ServiceDescriptorInterface
}

type RemoteProxyInterface interface {
	NewServiceInstance(name string) ServiceInterface
	RegisterService(constructor ServiceConstructorInterface, descriptor ServiceDescriptorInterface)
}
