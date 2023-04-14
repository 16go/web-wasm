package z

type MetaItemInterface interface {
	Key() any
	Value() any
}

type MetaInterface interface {
	Items() []MetaItemInterface
	AddItem(key any, value any)
	RemoveItem(key any)
}

type MetaCompressorInterface interface {
	Compress(MetaInterface) []byte
	Decompress([]byte) MetaInterface
}

type MessageInterface interface {
	Meta() MetaInterface
	Payload() []byte
}

type PackedMessageInterface interface {
	Meta() []byte
	Payload() []byte
}

type MessageProducerConstructor interface {
	New(ChannelInterface) MessageProducerInterface
}

type MessageProducerInterface interface {
}

//
//
//

type MessageConsumerConstructor interface {
	New(ChannelInterface) MessageConsumerInterface
}

type MessageConsumerInterface interface {
}
