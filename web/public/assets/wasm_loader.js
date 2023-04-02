importScripts('wasm_exec.js'); // This file is provided by the Go distribution

function test1() {
    const tagToImport = new WebAssembly.Tag({ parameters: ["i32"] });

// Note: import object properties match the WebAssembly import statement!
    const importObject = {
        extmod: {
            exttag: tagToImport,
        },
    };

    WebAssembly.compileStreaming(fetch("example.wasm"), importObject)
        .then((obj) => {
            console.log(obj.instance.exports.run());
        })
        .catch((e) => {
            console.error(e);
            // Check we have the right tag for the exception
            // If so, use getArg() to inspect it
            if (e.is(tagToImport)) {
                console.log(`getArg 0 : ${e.getArg(tagToImport, 0)}`);
            }
        });
}

async function test2() {
    console.log('start')
    const response = await fetch('main.wasm?' + Math.random())
    // .catch(error => {
    //     console.log('err')
    //     throw new Error('Failed to fetch WASM module')
    // })
    //console.log('wasm module ' + buffer.byteLength)
    const go = new Go();
    //console.log(go.importObject)
    const wasmInstance = await WebAssembly.instantiateStreaming(response, go.importObject);
    go.run(wasmInstance);
    console.log('end')
}

function test3() {
    const go = new Go();
    WebAssembly.instantiateStreaming(fetch("main.wasm"), go.importObject).then((result) => {
        go.run(result.instance);
    });
}

// Load the WebAssembly module
(async () => {
    test3()
})()
    // .catch((error) => {
    //     console.log(error)
    //     throw error;
    // })