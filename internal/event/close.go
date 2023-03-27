package event

import (
	pkgevent "github.com/16go/web-wasm/pkg/event"
	"syscall/js"
)

type closeEventPropName string

const (
	Code     closeEventPropName = "code"
	Reason                      = "reason"
	WasClean                    = "wasClean"
)

type closeEvent struct {
	pkgevent.EventInterface
}

func NewCloseEvent(jv js.Value) closeEvent {
	e := closeEvent{}
	e.EventInterface = FromJsVal(jv)
	return e
}

// GetCode returns an unsigned short containing the close code sent by the server.
func (e closeEvent) GetCode() int {
	return e.EventInterface.JsVal().Get(string(Code)).Int()
}

// GetReason returns a string indicating the reason the server closed the connection.
// This is specific to the particular server and sub-protocol.
func (e closeEvent) GetReason() string {
	return e.EventInterface.JsVal().Get(string(Reason)).String()
}

// GetWasClean returns a boolean value that indicates whether or not the connection was cleanly closed.
func (e closeEvent) GetWasClean() bool {
	return e.EventInterface.JsVal().Get(string(WasClean)).Bool()
}
