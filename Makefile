# Makefile

# Define the name of the output binary
BINARY_NAME=hello
# Define the source files for the Go program
SOURCE_DIR=cmd
# Define the build output directory
WASM_BUILD_DIR=./web/public/assets

GOBUILD=GOARCH=wasm GOOS=js go build -o

WASM_WS_MODULE:=$(WASM_BUILD_DIR)/websocket.wasm pkg/*.go
$(WASM_WS_MODULE): $(SOURCE_DIR)/websocket/main.go
	$(GOBUILD) $@ $^

# Define the default Make target
all: $(WASM_WS_MODULE)

# Define the clean target
clean:
	rm -f $(WASM_BUILD_DIR)/*.wasm
