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

beforeAll(async () => {
    browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto("http://localhost:3000")


    //await page.addScriptTag({url: 'assets/wasm_exec.js'})
    //await page.addScriptTag({url: 'assets/worker.js'})
    const result = await page.evaluate(async() => {
        //const go = new Go();
        //const wasmModule = new WebAssembly.Module(await fetch('assets/websocket.wasm').then(response => response.arrayBuffer()));
        //const wasmInstance = new WebAssembly.Instance(wasmModule, go.importObject);
        //const result = await WebAssembly.instantiateStreaming(fetch('assets/websocket.wasm'), go.importObject)
        //const { mod, inst } = result;
        //go.run(wasmInstance);
        const worker = new Worker('assets/wasm_loader.js');
        // worker.onmessageerror(() => {
        //     console.log('worker error')
        // })
    });
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