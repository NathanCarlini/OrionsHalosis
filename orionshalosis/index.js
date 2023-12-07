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

let mat = 0;
let mat2 = 0;
function resources(m1, m2, player1, player2){
  if(player1 == true){
    mat = m1 + 150;
  } else if(player2 == true){
    mat2 = m2 + 150;
  }
}

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('move', (targetX, targetY, dir) => {
      io.emit('move', targetX, targetY, dir);
    })

    socket.on('resources', (m1, m2, player1, player2, price) => {
      if (typeof price === 'undefined'){
        resources(m1, m2, player1, player2);
      } else {
        if(player1 == true){
          mat = m1 - price;
        } else if(player2 == true){
          mat2 = m2 - price;
        }
        // console.log(mat, mat2);
      }
      m1 = mat;
      m2 = mat2;
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
    });

    socket.on('turnPlayer', (m1, m2, player1, player2) => {
      resources(m1, m2, player1, player2);
      m1=mat;
      m2=mat2;
      io.emit('resources',m1,m2);
      io.emit('turnPlayer', player1, player2);
    });

    socket.on('skip', (player1, player2) => {
      io.emit('skip', player1, player2);
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});