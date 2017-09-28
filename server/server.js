const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '..', '/public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;
const users = new Users();


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left the room`));
        }
    });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);
        if(user)
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        callback();
    });

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and Room name are required');
        } else {
            socket.join(params.room);
            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.room);
            io.to(params.room).emit('updateUserList', users.getUserList(params.room));
            socket.emit('newMessage', generateMessage('admin', "Welcome to the chat"));
            socket.broadcast
                .to(params.room)
                .emit('newMessage', generateMessage('admin', `${params.name} has joined the room`));
            callback();
        }
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('admin', coords.lat, coords.lng));
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})