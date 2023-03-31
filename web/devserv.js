import { WebSocketServer  } from 'ws';
import express from 'express';

const app = express();
const wss = new WebSocketServer({ port: 8080 });

// Serve static files from the public directory
app.use(express.static('web/public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

// WebSocket server listeners
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Echo the message back to the client
        ws.send(`You sent: ${message}`);
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
