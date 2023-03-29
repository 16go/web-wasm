// Import the WebAssembly module
import fs from "fs";
import * as wasm from "wasm_exec";

beforeAll(async () => {
    // Read the WebAssembly binary file
    const wasmBinary = fs.readFileSync('./build/websocket.wasm');
    const go = new Go();
    // Instantiate the module
    await WebAssembly.instantiate(wasmBinary, go.importObject)
        .then(result => {
            // Your Wasm module is now loaded and ready to use!
            // You can call its exported functions like this:
            //const value = result.instance.exports.add(1, 2);
            console.log(1);
            go.run(result.instance);
            //console.log(WebAssembly.value)
        });
});

// Describe the test suite
describe("myWebAssemblyFunction", () => {
    // Define the test case
    it("should return the sum of two numbers2", () => {
        // Call the WebAssembly function with arguments
        //instance.
        //console.log(global)
        //global.WebAssembly.global.WASM_Foo("sdfsdf")
        //const result = instance.exports.WASM_Foo2("sfdsdfsf");

        // Assert that the result is correct
        expect(5).toEqual(5);
    });
});