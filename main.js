const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use('/static', express.static(__dirname + '/static'));

//app.use('/blockly/media', express.static(__dirname + '/blockly/media'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  socket.on('generateCode', (code) => {
    console.log('generateCode:\n', code);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});