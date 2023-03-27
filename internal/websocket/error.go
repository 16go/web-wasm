package websocket

const (
	NormalClosure           errCodeTyp = 1000
	GoingAway                          = 1001
	ProtocolError                      = 1002
	UnsupportedData                    = 1003
	Reserved                           = 1004
	NoStatusReceived                   = 1005
	AbnormalClosure                    = 1006
	InvalidFramePayloadData            = 1007
	PolicyViolation                    = 1008
	MessageTooBig                      = 1009
	MissingExtension                   = 1010
	InternalError                      = 1011
	TLSHandshakeFailed                 = 1015
)

type (
	errCodeTyp int
	errMapTyp  map[errCodeTyp]string
)

var errMap errMapTyp

func init() {
	errMap = errMapTyp{
		NormalClosure:           "Normal closure",
		GoingAway:               "Going away",
		ProtocolError:           "Protocol error",
		UnsupportedData:         "Unsupported data",
		Reserved:                "Reserved",
		NoStatusReceived:        "No status received",
		AbnormalClosure:         "Abnormal closure",
		InvalidFramePayloadData: "Invalid frame payload data",
		PolicyViolation:         "Policy violation",
		MessageTooBig:           "Message too big",
		MissingExtension:        "Missing extension",
		InternalError:           "Internal error",
		TLSHandshakeFailed:      "TLS handshake failed",
	}
}

func (errMapTyp) checkCustomCode(code int) {
	if code < 4000 && code > 4999 {
		panic("WebSocket custom error code number must be in the range of 4000-4999")
	}
}

func (errMapTyp) getErrorText(code int) string {
	if errText, has := errMap[errCodeTyp(code)]; has {
		return errText
	} else {
		return "Unknown error"
	}
}
