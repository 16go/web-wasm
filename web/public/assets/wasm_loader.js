importScripts('wasm_exec.js'); // This file is provided by the Go distribution

// Load the WebAssembly module
(async () => {
    const go = new Go();
    const wasmModule = await fetch('assets/websocket.wasm').then(response => response.arrayBuffer());
    const wasmInstance = await WebAssembly.instantiate(wasmModule, go.importObject);
    go.run(wasmInstance);
})()