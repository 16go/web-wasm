package z

import "syscall/js"

type ExportableApiInterface interface {
	New(constructorArgs ...any) js.Value
}
