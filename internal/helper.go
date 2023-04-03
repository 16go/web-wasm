package internal

// VariadicPrependFirstArg prepends the first argument to the list of variadic function arguments.
// The maximum number of arguments is 16. That ought to be sufficient for all possible Web API functions.
func VariadicPrependFirstArg[Args1Typ any, RestTyp any](arg1 Args1Typ, rest ...RestTyp) []any {
	argsArr := [16]any{}
	argsArr[0] = arg1
	for idx, v := range rest {
		argsArr[idx+1] = v
	}
	args := argsArr[:len(rest)+1]
	return args
}
