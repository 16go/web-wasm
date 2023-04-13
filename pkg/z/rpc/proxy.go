package rpc

import "github.com/16go/web-wasm/pkg/z"

type (
	Handle          uintptr
	EventListenerFn func(EventInterface) any
)

type EventInterface interface {
	Data() any
}

//type ChannelOption func(...any) OptionInterface

//tpe ChannelOptionTyp [0]ChannelOption

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

type ServiceProxyInterface interface {
	NewServiceInstance(name string) ServiceInterface
	Regis  terService(constructor ServiceConstructorInterface, descriptor ServiceDescriptorInterface)
}
