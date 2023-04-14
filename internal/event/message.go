package event

import (
	"github.com/16go/web-wasm/pkg/z/web"
	"syscall/js"
)

type msgEventPropName string

const (
	Data        msgEventPropName = "data"
	LastEventID                  = "lastEventId"
	Origin                       = "origin"
	Ports                        = "ports"
	Source                       = "source"
)

type msgEvent struct {
	web.EventInterface
}

func NewMessageEvent(jv js.Value) msgEvent {
	e := msgEvent{}
	e.EventInterface = FromJsVal(jv)
	return e
}

// GetData returns the value of the "data" property of the event.
func (e msgEvent) GetData() string {
	return e.EventInterface.JsVal().Get(string(Data)).String()
}

// GetLastEventID returns the value of the "lastEventId" property of the event's data object.
func (e msgEvent) GetLastEventID() string {
	return e.EventInterface.JsVal().Get(string(LastEventID)).String()
}

// GetOrigin returns the value of the "origin" property of the event's data object.
func (e msgEvent) GetOrigin() string {
	return e.EventInterface.JsVal().Get(string(Origin)).String()
}

// GetPorts returns the value of the "ports" property of the event's data object.
func (e msgEvent) GetPorts() js.Value {
	return e.EventInterface.JsVal().Get(string(Data)).Get(string(Ports))
}

// GetSource returns the value of the "source" property of the event's data object.
func (e msgEvent) GetSource() js.Value {
	return e.EventInterface.JsVal().Get(string(Data)).Get(string(Source))
}

// IsComposed returns whether the event is composed.
func (e msgEvent) IsComposed() bool {
	return e.EventInterface.JsVal().Get(string(Composed)).Bool()
}
