package internal

import "testing"

func variadicPrependFirstArg_Append(arg1 any, rest ...any) []any {
	args := make([]any, 0, 8)
	args = append(args, arg1)
	args = append(args, rest...)
	return args
}

func dummy(...any) {}

// go test -bench=. -benchmem -benchtime=4s ./internal/
// cpu: Intel(R) Core(TM) i5-10400 CPU @ 2.90GHz
// BenchmarkVariadicPrependFirstArg-12           	1000000000	         2.754 ns/op	  0 B/op	   0 allocs/op
// BenchmarkVariadicPrependFirstArg_Append-12    	87298404	        54.70 ns/op	      48 B/op	   2 allocs/op
func BenchmarkVariadicPrependFirstArg(b *testing.B) {
	for i := 0; i < b.N; i++ {
		args := VariadicPrependFirstArg[int, any](1, "2", []int{1, 2, 3})
		dummy(args...)
	}
}

func BenchmarkVariadicPrependFirstArg_Append(b *testing.B) {
	for i := 0; i < b.N; i++ {
		args := variadicPrependFirstArg_Append(1, "2", []int{1, 2, 3})
		dummy(args...)
	}
}
