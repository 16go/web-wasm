import term from 'terminal-kit';
import {LjSession, CommentAction}  from './bot.mjs';
import {getRandomNastyMessage} from "./helpers.mjs";

const DEFAULT_PASS = '$JohnDoe200$';

const t = term.terminal;

async function replyWithNastyMessages(comments) {
    for (let i = 0; i < comments.length; i++) {
        let { username, text, commentId, profileUsername } = comments[i];
        const bl = ljbot.getBlackList();
        let found = bl.find(el => {
            return el === username || el === profileUsername;
        })
        if (found) {
            console.log('Moron detected: username="%s", comment #%d, text="%s"', username, commentId, text);
            const nastyMsg = getRandomNastyMessage()
            console.log('\twhack the moron with the nasty message "%s"', nastyMsg);
            console.log('');
            let action = new CommentAction(ljbot.getPage(), commentId);
            await action.Reply(nastyMsg);
        }
    }
}

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
        }
    }
}

const ljbot = await LjSession.userFactory('rohecew3497173', DEFAULT_PASS);
const comments = await ljbot.readComments('https://colonelcassad.livejournal.com/8426635.html');
//const comments = await ljbot.readComments('https://colonelcassad.livejournal.com/8426299.html');

//await poopComments(comments);
await replyWithNastyMessages(comments);

//await ljbot.Navigate('https://colonelcassad.livejournal.com/8426110.html#comments');
//const commentAction = new CommentAction(ljbot.getPage(), '2193122942');
//await commentAction.Reply(getRandomNastyMessage());

//console.log(comments);

// t.magenta( "Enter your name: " ) ;
// t.inputField(
//     function( error , input ) {
//         t.green( "\nYour name is '%s'\n" , input );
//         t.exit();
//     }
// ) ;