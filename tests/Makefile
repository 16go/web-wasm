# Makefile

# Define the name of the output binary
BINARY_NAME=hello

# Define the source files for the Go program
SOURCE_DIR=../cmd

# Define the target architecture and operating system
GOARCH=wasm
GOOS=js

# Define the build output directory
BUILD_OUTPUT_DIR=build

# Define the compiler flags
FLAGS=

# Define the default Make target
all: build

# Define the build target
build: $(SOURCE_DIR)/websocket/main.go
	GOARCH=$(GOARCH) GOOS=$(GOOS) go build $(FLAGS) -o $(BUILD_OUTPUT_DIR)/websocket.wasm $(SOURCE_DIR)/websocket/main.go

# Define the clean target
clean:
	rm -rf $(BUILD_OUTPUT_DIR)/
