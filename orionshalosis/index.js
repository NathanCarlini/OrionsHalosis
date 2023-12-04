const express = require('express');
const app = express();
app.use("/static", express.static('./static/'));
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

setInterval(timer, 1000)
let sec = 20;
function timer(){
  sec--;
}

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('move', (targetX, targetY) => {
      io.emit('move', targetX, targetY);
    })
    socket.on('resources', (m1,m2) => {
      io.emit('resources',m1,m2);
    })
    socket.on('resetTime', (timer) => {
      if (typeof timer !== 'undefined'){
        sec = timer;
      } else {
        sec = 20;
      }
      io.emit('resetTime');
    })
    socket.on('time', () => {
      io.emit('time',sec);
    })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});