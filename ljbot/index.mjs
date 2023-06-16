import term from 'terminal-kit';
import {LjSession, CommentAction}  from './bot.mjs';

const DEFAULT_PASS = '$JohnDoe200$';

const t = term.terminal;

const banList = [
    'fat-smelly', 'manul-a', 'ext-4439743',
    'ext-6264396', 'vladimir-v-y', 'adolfkorshun',
    'red-run', 'lheujq321', 'tpaxtop-ibnivan',
    'sisipatych', 'bslo', 'ext-2765015', 'parbo1',
    'alexa-maximova7', 'drgrand', 'slonok',
    'toska-forsite', 'yasha-druz', 'sir-benoit',
    'lefirol', 'ext-3731313', 'ext-6228433'
];

async function poopComments(comments) {
    for (let i = 0; i < comments.length; i++) {
        console.log(comments[i])
        let { username, text, commentId, profileUsername } = comments[i];
        const bl = ljbot.getBlackList();
        let found = bl.find(el => {
            return el === username || el === profileUsername;
        })
        if (found) {
            console.log('Moron detected: username="%s", comment #%d, text="%s"', username, commentId, text);
            let action = new CommentAction(ljbot.getPage(), commentId);
            await action.PoopComment();
            break;
        }
    }
}

const ljbot = await LjSession.userFactory('rohecew3497173', DEFAULT_PASS);
//const comments = await ljbot.readComments('https://colonelcassad.livejournal.com/8426110.html');

//await poopComments(comments);

await ljbot.Navigate('https://colonelcassad.livejournal.com/8426110.html');
const commentAction = new CommentAction(ljbot.getPage(), '2193122942');
await commentAction.PoopComment()

//console.log(comments);

// t.magenta( "Enter your name: " ) ;
// t.inputField(
//     function( error , input ) {
//         t.green( "\nYour name is '%s'\n" , input );
//         t.exit();
//     }
// ) ;