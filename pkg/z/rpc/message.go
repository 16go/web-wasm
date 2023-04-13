package rpc

type MetaInterface interface {
	Name() string
	Value() any
}

type MetaCompressorInterface interface {
	Compress([]MetaInterface) []byte
	Decompress([]byte) []MetaInterface
}

type MessageInterface interface {
	Meta() []MetaInterface
	Payload() []byte
}

type PackedMessageInterface interface {
	Meta() []byte
	Payload() []byte
}
