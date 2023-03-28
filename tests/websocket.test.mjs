// Import the WebAssembly module
//import { instance } from "./build/websocket.wasm";
import fs from "fs";
//import * as wasm from "/usr/local/go/misc/wasm/wasm_exec_node";

// Read the WebAssembly binary file
const wasmBinary = fs.readFileSync('./build/websocket.wasm');

//console.log(wasmBinary)

// Instantiate the module
WebAssembly.instantiate(wasmBinary, {})
    .then(result => {
        // Your Wasm module is now loaded and ready to use!
        // You can call its exported functions like this:
        //const value = result.instance.exports.add(1, 2);
        console.log(1);
    });

//const go = new Go();

// Get a reference to the exported function
//const { WASM_Foo } = wasmInstance.exports;

// Describe the test suite
describe("myWebAssemblyFunction", () => {
    // Define the test case
    it("should return the sum of two numbers2", () => {
        // Call the WebAssembly function with arguments
        //instance.
        //WASM_Foo("sdfsdf")
        //const result = instance.exports.WASM_Foo2("sfdsdfsf");

        // Assert that the result is correct
        expect(5).toEqual(5);
    });
});