import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import {getRandomNastyMessage} from "./helpers.mjs";
import fs from 'fs';

const DEFAULT_PASS = '';
const LJ_URL = 'https://www.livejournal.com/';
const ACCOUNT_EMAIL = 'rohecew349@anwarb.com';
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

async function typeIn(page, selector, text) {
    await page.focus(selector).catch(e => {
        console.error('typeIn: ' + e.message);
    });
    await sleep(100);
    await page.keyboard.type(text);
    await sleep(100);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const validateEmail = email => /^[^@ ]+@[^@ ]+\.[^@ \.]+$/.test(email);

puppeteer.use(StealthPlugin())

async function newBrowserPage({headless = true}) {
    const browserPath = process.env.PUPPETEER_BROWSER_PATH;
    if (browserPath === undefined || browserPath.length === 0) {
        throw new Error('PUPPETEER_CHROMIUM_PATH environment variable must be set')
    }
    const width = 1024, height = 1600;
    const options = {
        args: [
            '--start-maximized' // you can also use '--start-fullscreen'
        ],
        executablePath: browserPath,
        pipe: true,
        devtools: true,
        headless: headless,
        defaultViewport: {width, height}
    };
    browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setViewport({width: 1280, height: 720});

    return  { browser, page };
}

async function loadPage(page, pageUrl) {
    console.log('Loading page %s', pageUrl)
    return await page.goto(pageUrl, {timeout: 0});
}

// Fetch new temporarily email
async function createLjAccount(email) {
    const page = await loadPage(CREATE_ACCOUNT);
    await page.setViewport({width: 1366, height: 768});
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

//
//await createLjAccount(ACCOUNT_EMAIL);

//await loadPage('https://temp-mail.org/en/');

export async function openBrowser() {
    browser = await setup({headless: false});
}

class CommentAction {
    commentId;
    page;
    constructor(page, commentId) {
        this.page = page;
        this.commentId = commentId;
    }

    getCommentReactionsElCoordinates = async () => {
        const raw = await this.page.evaluate((commentId) => {
            (function() {
                document.onmousemove = handleMouseMove;
                function handleMouseMove(event) {
                    var eventDoc, doc, body;

                    event = event || window.event; // IE-ism

                    // If pageX/Y aren't available and clientX/Y are,
                    // calculate pageX/Y - logic taken from jQuery.
                    // (This is to support old IE)
                    if (event.pageX == null && event.clientX != null) {
                        eventDoc = (event.target && event.target.ownerDocument) || document;
                        doc = eventDoc.documentElement;
                        body = eventDoc.body;

                        event.pageX = event.clientX +
                            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                            (doc && doc.clientLeft || body && body.clientLeft || 0);
                        event.pageY = event.clientY +
                            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                            (doc && doc.clientTop  || body && body.clientTop  || 0 );
                    }

                    // Use event.pageX / event.pageY here
                    console.log('mouse: x=%d, y=%d', event.pageX, event.pageY)
                }
            })();
            const selector = `.journal-reactions__inner [data-comment-id="${commentId}"]`;
            const reactionsEl = document.querySelector(selector);
            if (!reactionsEl) {
                throw new Error(`element not found: '${selector}'`);
            }

            const p = reactionsEl.parentElement;
            const rect = p.getBoundingClientRect();
            const coords =  {
                x: rect.left + rect.width / 2 - 10, //+ window.scrollX,
                y: rect.top + rect.height / 2 //+ window.scrollY
            }

            window.scrollTo(0, coords.y - 250);
            console.log('coords', coords)

            return JSON.stringify(coords);
        }, [this.commentId]);

        return JSON.parse(raw);
    }

    async PoopComment() {
        const { x, y } = await this.getCommentReactionsElCoordinates();
        // console.log(x, y);
        // await sleep(50);
        // await this.page.mouse.move(x+10, y);
        // await sleep(50); // wait for the reaction pop to appear.
        // await this.page.mouse.click(x - 70, y - 50);
        console.log('pooped on comment #%d, x=%d, y=%d', this.commentId, x, y);


        await sleep(50);
        await this.page.mouse.move(x, y);
        await sleep(25);
        //await this.page.mouse.move(x - 70, y - 50);
        await sleep(25);
        await this.page.mouse.click(x - 70, y - 50);

        await sleep(2500);
    }

    async Reply(message, delay = 2000) {
        await this.page.evaluate(async (commentId, message) => {
            const selector = `#ljcmt${commentId} .comment-menu__list a`;
            const links = document.querySelectorAll(selector);
            if (!links.length) {
                throw new Error(`selector: ${selector}`);
            }
            links[0].click();
        }, this.commentId);
        await this.page.focus('.textbox-commenttext');
        await sleep(50);
        await this.page.keyboard.type(message);
        await sleep(50);
        await this.page.click('#submitpost');
        await sleep(delay);
    }
}

class LjSession {
    page;
    browser;
    blacklist;
    constructor(browser, page) {
        this.browser = browser;
        this.page = page;
        this.blacklist = [
            'fat-smelly', 'manul-a', 'ext-4439743',
            'ext-6264396', 'vladimir-v-y', 'adolfkorshun',
            'red-run', 'lheujq321', 'tpaxtop-ibnivan',
            'sisipatych', 'bslo', 'ext-2765015', 'parbo1',
            'alexa-maximova7', 'drgrand', 'slonok',
            'toska-forsite', 'yasha-druz', 'sir-benoit',
            'lefirol', 'ext-3731313', 'ext-6228433'
        ];
    }

    static async userFactory(username, password) {
        const { browser, page } = await newBrowserPage({headless: false});
        await loadPage(page, LJ_URL);
        await page.click('a.s-header-item__link--login');
        await sleep(100);
        console.log('Logging in as: %s', username)
        await typeIn(page, '#user', username);
        await typeIn(page, '#lj_loginwidget_password', password);
        await sleep(500);
        await page.evaluate(()=> {
            document.querySelector('[name="action:login"]').click();
        })
        await sleep(500);

        return new LjSession(browser, page);
    }

    async Navigate(url) {
        await loadPage(this.page, url);
    }

    async applyBlackList() {
        let val = '';
        this.blacklist.map((i) => {
            val += 'ban_set ' + i + '\n';
        });
        await this.page.focus('textarea');
        await this.page.keyboard.type(val);
        await this.page.click('[type="SUBMIT"]');
        await sleep(50);
    }

    getPage() {
        return this.page;
    }

    getBlackList() {
        return this.blacklist;
    }

    async expandComments(page, limit = -1) {
        let nExpanded = 0;
        do {
            const result = await page.evaluate(()=> {
                let result = false;
                const links = document.querySelectorAll('span[id*="expand"] a');
                if (!links.length) {
                    return false;
                }
                links.forEach(l => {
                    const wasClicked = l.parentElement.style.display === 'none';
                    if (result || l.innerText !== 'Развернуть' || wasClicked) {
                        return
                    }
                    console.log('expanding comment link...');
                    l.click();
                    result = true;
                })
                return result;
            });
            if (!result || nExpanded <= limit) {
                return;
            }
            nExpanded++;
            await sleep(1000);
        } while(true);
    }

    async readComments(targetUrl) {
        console.log('');
        await loadPage(this.page, targetUrl + '#comments');
        await sleep(100);
        console.log('Extract comments from the current page');

        await this.expandComments(this.page);
        const resultsJson = await this.page.evaluate(()=> {
            const results = [];
            document.querySelectorAll('.comment-wrap').forEach(el => {
                if (!el) {
                    return;
                }
                const userSpan = el.querySelector('.comment-head .comment-head-in .comment-poster-info span');
                if (!userSpan) {
                    return
                }
                const username = userSpan.getAttribute('lj:user');
                const profileUsername = username.replace('_', '-');
                const timestamp = el.querySelector('.comment-head .comment-head-in .comment-metadata .comment-datetimelink a').innerText;
                const rawText = el.querySelector('.comment-text').innerText;
                const text = rawText.replaceAll(/\n/g, '. ')
                let commentId = el.getAttribute('id').replace(/^\D+/g, '');
                const comment = { username, profileUsername, timestamp, rawText, text, commentId };
                results.push(comment);
            });
            return JSON.stringify(results);
        });

        const results = JSON.parse(resultsJson);
        console.log('%d comments have been extracted', results.length);
        console.log('');

        return results;
    }

    async replyWithNastyMessages(targetUrl) {
        const comments = await this.readComments(targetUrl);
        const pageContent = await this.page.content();
        const now = Date.now();
        const htmlPageFilename = `/tmp/page_${now}.html`;
        // Save page content to reload the page each time after we added a new reply.
        fs.writeFile(htmlPageFilename, pageContent, function (err) {
            if (err) {
                throw err;
            }
        });
        for (let i = 0; i < comments.length; i++) {
            let { username, text, commentId, profileUsername } = comments[i];
            const bl = this.getBlackList();
            let found = bl.find(el => {
                return el === username || el === profileUsername;
            })
            if (found) {
                console.log('Moron detected: username="%s", comment #%d, text="%s"', username, commentId, text);
                const nastyMsg = getRandomNastyMessage()
                console.log('\twhack the moron with the nasty message "%s"', nastyMsg);
                let action = new CommentAction(this.getPage(), commentId);
                await action.Reply(nastyMsg);
                // Reload page
                console.log(`reloading page from: ${htmlPageFilename}`);
                //await this.page.goto('file://'+htmlPageFilename, {timeout: 0});
                console.log('');
            }
        }
    }
}

export {
    CommentAction,
    LjSession
}
