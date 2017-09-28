const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '..', '/public');
const {generateMessage, generateLocationMessage} = require('./utils/message');

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

    socket.emit('newMessage', generateMessage('admin', "Welcome to the chat"));
    socket.broadcast.emit('newMessage', generateMessage('admin', "There's a new user in the chat"));

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback({
            reply:'Yoalsdkmfdsdalkma'
        });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('admin', coords.lat, coords.lng));
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})