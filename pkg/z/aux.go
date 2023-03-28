package z

import "syscall/js"

type OptionInterface func(target any)

type ExportedFn func(...js.Value)
