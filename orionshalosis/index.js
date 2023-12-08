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
function resources(m1, m2, player1, player2, capt1x15, capt2x15, capt1x2, capt2x2){
  if(player1 == false && capt1x2 == true){
    mat = m1 + 300;
  } else if(player1 == false && capt1x15 == true){
    mat = m1 + 225;
  } else if(player1 == false){
    mat = m1 + 150;
  } 
  if(player2 == false && capt2x2 == true){
    mat2 = m2 + 300;
  } else if(player2 == false && capt2x15 == true){
    mat2 = m2 + 225;
  } else if(player2 == false){
    mat2 = m2 + 150;
  }
  return m1, m2;
}

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('move', (targetX, targetY, dir) => {
      io.emit('move', targetX, targetY, dir);
    })

    socket.on('price', (m1, m2, player1, player2, price) => {
      if(player1 == true){
        mat = m1 - price;
      } else if(player2 == true){
        mat2 = m2 - price;
      }
      m1 = mat;
      m2 = mat2;
      io.emit('price',m1,m2);
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

    socket.on('turnPlayer', (m1, m2, player1, player2, capt1x15, capt2x15, capt1x2, capt2x2, recent) => {
      if (recent == 0){
        resources(m1, m2, player1, player2, capt1x15, capt2x15, capt1x2, capt2x2);
        m1=mat;
        m2=mat2;
        if(player1 == true){
          player1 = false;
          player2 = true;
        } else if (player2 == true){
            player2 = false;
            player1 = true;
        }
      }
      io.emit('turnPlayer', m1, m2, player1, player2);
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});