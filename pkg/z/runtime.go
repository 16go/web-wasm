package z

type ApiInfoInterface interface {
	GoVersion() string
	Version() string
	BuildTime() string
	Name() string
}
