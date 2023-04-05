importScripts('wasm_exec.js'); // This file is provided by the Go distribution

async function test() {
    const go = new Go();
    await WebAssembly.instantiateStreaming(fetch("websocket.wasm"), go.importObject).then((result) => {
        go.run(result.instance);
    });
}

// Load the WebAssembly module
(async () => {
    await test();
    console.log('worker: myvar=', self.myvar);
    console.log('worker: api=', self.ApiList);
    console.log('worker: api=', self.ApiList[0].newInstance());
})()

onmessage = (event) => {

}

// This event is fired when an unhandled error occurs in the worker code. You can use this event to handle errors
// that occur outside of message processing.
onerror = (event) => {
    console.log('Worker ERROR');
}

// This event is fired when an error occurs while processing a message received by the worker.
// You can use this event to handle errors that occur while parsing or processing message data.
onmessageerror = (event) => {
    console.log('Worker message error');
}

// onoffline and ononline:
// These events are fired when the worker goes offline or online, respectively. You can use these events to handle
// network connectivity changes in the worker.
onoffline = (event) => {
    console.log('Worker is offline');
}

ononline = (event) => {
    console.log('Worker is online');
}
