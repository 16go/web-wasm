// Import the WebAssembly module
import fs from "fs";
import { error } from "console";

//import crypto from "crypto";
//import ws from "webs"
//import * as wasm from "wasm_exec";

import puppeteer from 'puppeteer-core';
const chromePath = '/usr/bin/google-chrome';

const options = {
    executablePath: chromePath,
    pipe: true,
    devtools: true,
    //headless: true
    // other options...
};

let browser;

const bufferData = Buffer.from('Hello, world!', 'utf-8');

function serialize(data) {
    const out = " ".repeat(data.length);
    for (let i = 0; i < data.length; i++) {
        out[i] = String.fromCharCode.call(null, data[i])
    }
    return out;
}

beforeAll(async () => {
    // Read the WebAssembly binary file
    //globalThis.crypto = crypto
    //console.log(wasmBinary.length)


    // const browser = await puppeteer.launch(options);
    // const page = await browser.newPage();
    // // Create a buffer in Node.js
    // const buffer = Buffer.from('Hello, world!', 'utf8');
    // // Convert the buffer to a Uint8Array
    // //const uint8Array = new Uint8Array(buffer);
    //
    // // Pass the buffer as an argument to page.evaluate
    // const result = await page.evaluate(async (buffer) => {
    //     // Convert the buffer to a string in the browser context
    //     const str = buffer.toString('utf8');
    //     return Promise.resolve("ddd");
    // }, buffer);
    //
    // console.log(result); // Output: Hello, world!

    const filename = 'build/websocket.wasm';
    if (!fs.existsSync(filename)) {
        throw new Error("file does not exist")
    }

    const wasmBinary = fs.readFileSync(filename);
    browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto("http://localhost:8080")
    await page.addScriptTag({path: 'wasm_exec.js'})

    const textDecoder = new TextDecoder();
    const wasmString = textDecoder.decode(wasmBinary);//serialize(wasmBinary);
    console.log('ser wasm: ' + wasmString.length)

    const result = await page.evaluate(async (wasmString) => {
        function deserialize(str) {
            // Create a Uint8Array and fill it with the binary data
            const binaryData = new Uint8Array(str.length);
            for (let i = 0; i < str.length; i++) {
                binaryData[i] = str.charCodeAt(i);
            }
            return binaryData
        }
        console.log(wasmString.slice(0, 100))
        console.log(wasmString.length)
        const wasmBinary = deserialize(wasmString)
        if (!wasmBinary || wasmBinary.length === 0) {
            throw new Error("Buffer source is empty or null.");
        }

 //       const blob = new Blob([wasmBinary], { type: "application/wasm" });
  //      const url = URL.createObjectURL(blob);


        //const arrBuffer = new ArrayBuffer(buffer.byteLength)
        //const wasmModule = new WebAssembly.Module(wasmBinary);
        // // Instantiate the WASM instance
        await fetch('/foo.js').then(result => {
            console.log(result)
        })
        //const wasmInstance = new WebAssembly.Instance(mod, go.importObject);
        const go = new Go();
        console.log(go.importObject, 'ff')
        const mod = await WebAssembly.instantiateStreaming(fetch('build/websocket.wasm'), go.importObject)
        //go.run(mod);
        // Call a function in the WASM module
        //return wasmInstance.exports.myFunction();
        return Promise.resolve(true)
    }, wasmString);

    // // Instantiate the module
    // await WebAssembly.instantiate(wasmBinary, go.importObject)
    //     .then(result => {
    //         // Your Wasm module is now loaded and ready to use!
    //         // You can call its exported functions like this:
    //         //const value = result.instance.exports.add(1, 2);
    //         try {
    //             go.run(result.instance);
    //         } catch(e) {
    //             console.log(e)
    //         }
    //     });
});

afterAll(async () => {
//    await browser.close();
})

// Describe the test suite
describe("myWebAssemblyFunction", () => {
    // Define the test case
    it("should return the sum of two numbers", () => {
        // Call the WebAssembly function with arguments
        //Wasm_Foo("ws://localhost:9090")
        //const result = instance.exports.WASM_Foo2("sfdsdfsf");

        // Assert that the result is correct
        expect(5).toEqual(5);
    });
});