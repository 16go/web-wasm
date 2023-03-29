// Import the WebAssembly module
import fs from "fs";
//import crypto from "crypto";
//import ws from "webs"
import * as wasm from "wasm_exec";

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


beforeAll(async () => {
    // Read the WebAssembly binary file
    //globalThis.crypto = crypto
    //console.log(wasmBinary.length)
    const wasmBinary = fs.readFileSync('./build/websocket.wasm');
    browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    const result = await page.evaluate((buffer) => {
        // Instantiate the WASM module
        console.log(typeof buffer)
        const wasmModule = new WebAssembly.Module(buffer);
        // // Instantiate the WASM instance
        const go = new Go();
        const wasmInstance = new WebAssembly.Instance(wasmModule, go.importObject);
        go.run(wasmInstance);
        // Call a function in the WASM module
        //return wasmInstance.exports.myFunction();
    }, wasmBinary);

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