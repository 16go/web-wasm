package web

import "syscall/js"

type EventInterface interface {
	JsVal() js.Value
	IsBubbles() bool
	IsCancelable() bool
	IsComposed() bool
	GetCurrentTarget() js.Value
	IsDefaultPrevented() bool
	GetEventPhase() int
	GetExplicitOriginalTarget() js.Value
	IsTrusted() bool
	GetTarget() js.Value
	GetTimeStamp() int
	GetType() string
	//Target() js.Value
	//CurrentTarget() js.Value
	//Type() string
	//PreventDefault()
	//StopPropagation()
	//StopImmediatePropagation()
}

type MessageEventInterface interface {
	EventInterface
	GetData() string
}

type CloseEventInterface interface {
	EventInterface
	GetCode() int
	GetReason() string
	GetWasClean() bool
}
