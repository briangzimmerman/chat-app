const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '..', '/public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
        console.log('client disconnected')
    });

    // socket.emit('newMessage', {
    //     from: 'bzimmer2',
    //     content: "OOOOOOOPS",
    //     createdAt: Date.now()
    // });

    socket.on('createMessage', (message) => {
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: Date.now()
        });
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})