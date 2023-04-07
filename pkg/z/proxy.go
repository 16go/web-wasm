package z

type (
	Handle          uintptr
	ListenerHandler func() any
)

//type ChannelOption func(...any) OptionInterface

//tpe ChannelOptionTyp [0]ChannelOption

type ChannelOptionsInterface interface {
	// Throttle throttles sending of client messages.
	Throttle(ms int)
	// Debounce
	Debounce(ms int)
	MaxMessageSize(int) OptionInterface
	ReadTimeout(int) OptionInterface
	WriteTimeout(int) OptionInterface
}

type ChannelInterface interface {
	Write()
	OnMessage()
	OnError()
	OnReadTimeoutHandler(ListenerHandler)
	OnWriteTimeoutHandler(ListenerHandler)
}

type ServiceInfoInterface interface {
}

type ServiceDescriptorInterface interface {
}

type ServiceInterface interface {
	Handle() Handle
	Descriptor() ServiceDescriptorInterface
}

type RemoteProxyInterface interface {
	NewServiceInstance(name string) ServiceInterface
}
