const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

const colors = ['red', 'yellowgreen'];
const userColorMapping = {};

const getUserMappedClass = (userId) => {
    userColorMapping[userId] = userColorMapping[userId] || colors.shift();
    return userColorMapping[userId];
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (incomingMessageDetailJson) => {
        const incomingMessageDetail = JSON.parse(incomingMessageDetailJson);
        const timestamp = new Date().toISOString();
        const userMappedClass = getUserMappedClass(incomingMessageDetail.userId);
        const msgDetail = { message: incomingMessageDetail.message, timestamp, class: userMappedClass };
        io.emit('chat message', JSON.stringify(msgDetail));
    });
});

app.use(express.static(__dirname + '/public/'));

http.listen(PORT, function() {
    console.log('listening on *:' + PORT);
});