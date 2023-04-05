package z

type CallbackFn func(...any) any

type ApiInfoInterface interface {
	GetName() string
	GetMajorVersion() int
	GetMinorVersion() int
}

type ApiInterface interface {
	Info() ApiInfoInterface
	NewInstance() any
}
