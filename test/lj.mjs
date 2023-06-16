import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const DEFAULT_PASS = '';
//const ACCOUNT_EMAIL = 'rohecew349@anwarb.com';
const ACCOUNT_EMAIL = 'dilili6893@aaorsi.com';
const CREATE_ACCOUNT = 'https://www.livejournal.com/create';
const ADMIN_BAN_SET = 'https://www.livejournal.com/admin/console/';

const INPUT_DELAY = 600;

let browser;

const banList = [
    'fat-smelly', 'manul-a', 'ext-4439743',
    'ext-6264396', 'vladimir-v-y', 'adolfkorshun',
    'red-run', 'lheujq321', 'tpaxtop-ibnivan',
    'sisipatych', 'bslo', 'ext-2765015', 'parbo1',
    'alexa-maximova7', 'drgrand', 'slonok',
    'toska-forsite', 'yasha-druz', 'sir-benoit',
    'lefirol', 'ext-3731313', 'ext-6228433'
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const validateEmail = email => /^[^@ ]+@[^@ ]+\.[^@ \.]+$/.test(email);

puppeteer.use(StealthPlugin())

async function setup({ headless = true }) {
    const browserPath = process.env.PUPPETEER_BROWSER_PATH;
    if (browserPath === undefined || browserPath.length === 0) {
        throw new Error('PUPPETEER_CHROMIUM_PATH environment variable must be set')
    }
    const width=1024, height=1600;
    const options = {
        args:[
            '--start-maximized' // you can also use '--start-fullscreen'
        ],
        executablePath: browserPath,
        pipe: true,
        devtools: true,
        headless: headless,
        defaultViewport: { width, height }
    };
    browser = await puppeteer.launch(options);
    return browser;
}

async function loadPage(pageUrl) {
    console.log('Loading page %s...', pageUrl)
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(pageUrl);
    return page;
}

// Fetch new temporarily email
async function createLjAccount(email) {
    const page = await loadPage(CREATE_ACCOUNT);
    await page.setViewport({ width: 1366, height: 768});
    const username = email.split('@')[0] + Math.random().toString().split('.')[1].substring(0, 4);

    console.log('Register a new user with email "%s", username: "%s" ', email, username);

    await page.focus('input[name="username"]');
    await sleep(INPUT_DELAY);
    await page.keyboard.type(username);
    await sleep(INPUT_DELAY);
    await page.focus('input[name="email"]');
    await sleep(INPUT_DELAY);
    await page.keyboard.type(email);
    await sleep(INPUT_DELAY);
    await page.focus('#password');
    await sleep(INPUT_DELAY);
    await page.keyboard.type('$JohnDoe200$');
    await sleep(INPUT_DELAY);
    await page.select('select[name="day"]', '3');
    await sleep(INPUT_DELAY);
    await page.select('select[name="month"]', '3');
    await sleep(INPUT_DELAY);
    await page.select('select[name="year"]', '1973');
    await sleep(INPUT_DELAY);
    await page.select('select[name="gender"]', 'M');
    await sleep(INPUT_DELAY);

    // await page.evaluate(() => {
    //     document.querySelector('[name="signupForm"]').submit();
    // });
    // await page.focus('[type="submit"]');
    // await page.evaluate(()=> {
    //     document.querySelector('[type="submit"]').click()
    // })
    //await page.click('[type="submit"]');

    console.log('Waiting for form submit...')

    await page.waitForSelector('h2.tiny-profile__title', {timeout: 0});

    console.log('Now ban some morons...')
    await page.goto(ADMIN_BAN_SET);
    await adminBanSet(page);

    await page.goto('https://colonelcassad.livejournal.com/');

    await page.waitForSelector('h2.replylink', {timeout: 0});
    postMessage(page, 'Hello');

    console.log('Done!')
}

async function postMessage(page, message) {
    //
    page('span.replylink').click();
    //submitpost
    await page.focus('textarea');
    await page.keyboard.type(message);
    await page.click('#submitpost');
}

async function adminBanSet(page) {
    let val = '';
    banList.map((i) => {
        val += 'ban_set ' + i + '\n';
    });
    await page.focus('textarea');
    await page.keyboard.type(val);
    await page.click('[type="SUBMIT"]');
}

// Launch browser
browser = await setup({  headless: false });

//
await createLjAccount(ACCOUNT_EMAIL);

//await loadPage('https://temp-mail.org/en/');


