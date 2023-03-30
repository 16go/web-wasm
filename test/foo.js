import fs from 'fs';
import puppeteer from 'puppeteer-core';
const chromePath = '/usr/bin/google-chrome';

(async () => {
    const browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: false
    });
    const page = await browser.newPage();
    // Load the page
    await page.goto('https://example.com');
    // Read binary data from a file
    const binaryData = fs.readFileSync('build/websocket.wasm');
    console.log('read data: ', binaryData.length)
    // Pass binary data to page.evaluate as a Uint8Array
    const result = await page.evaluate(async (binaryData, d) => {
        console.log(binaryData, d)
        const buffer = new Uint8Array(binaryData);
        // Do something with the buffer
        console.log('buffer length: ' + buffer.byteLength)
        return buffer.length;
    }, binaryData.buffer, 23);

    console.log(result); // Prints the length of the binary data buffer

    //await browser.close();
})();