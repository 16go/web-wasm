import puppeteer from 'puppeteer-core';

const DEV_SERVER = "http://localhost:3000";

export default async function setup({ headless = true, pageUrl = DEV_SERVER } = options) {
    const browserPath = process.env.PUPPETEER_BROWSER_PATH;
    if (browserPath === undefined || browserPath.length === 0) {
        throw new Error('PUPPETEER_CHROMIUM_PATH environment variable must be set')
    }
    const options = {
        executablePath: browserPath,
        pipe: true,
        devtools: true,
        headless: headless
    };
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto(pageUrl);

    return { browser, page };
}