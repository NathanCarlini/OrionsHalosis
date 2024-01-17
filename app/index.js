const https = require("https");
const { Server } = require("socket.io");
const path = require("path");
const cors = require("cors");
const fs = require('fs');

const httpsServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
});
// const windowPath = window.location.origin;
const io = new Server(httpsServer, {
  cors: {
    origin: `https://planets.mmi-limoges.fr:3000`,
    methods: ["GET", "POST"],
    allowedHeaders: [""],
    credentials: true,
  },
});
let room = "";
let sec = 1000000000000;
setInterval(timer, 1000)
function timer(){
  sec--;
}
let mat = 150;
let mat2 = 0;
let recent = 0;
let state = false;
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

io.on('connection', socket => { 

  socket.on('roomInfo', (roomInfo) => {
    room = roomInfo
    if(io.engine.clientsCount >= 2 && state == false){
      players = io.engine.clientsCount;
      state = true;
      io.emit('countInit', players, room);
    } else {
      state = false;
    }
  });

  if (state == false){
    players = io.engine.clientsCount;
    state = true;
    io.emit('countInit', players, room);
  }
  socket.on('startGame', (room) => {
    state = true;
    socket.join(room);
    io.to(room).emit('startGame');
  });

  socket.on('props', (data, firstPlayer, room) => {
    if(firstPlayer == true){
      usernameP1 = data.username;
      usernameP2 = null;
    } else {
      usernameP2 = data.username;
      usernameP1 = null;
    }
    if(firstPlayer == true){
      idP1 = data.iduser;
      idP2 = null;
    } else {
      idP2 = data.iduser;
      idP1 = null;
    }
    io.to(room).emit('props', usernameP1, usernameP2, idP1, idP2);
  })
        
  socket.on('gameState', (halosis, halosis2, rocketPosx, rocketPosx2, rocketPosy, rocketPosy2, state, firstPlayer) => {
    if (state.p1 == true){
      FP = firstPlayer;
    }
    h1 = halosis;
    h2 = halosis2;
    rpx1 = rocketPosx;
    rpx2 = rocketPosx2;
    rpy1 = rocketPosy;
    rpy2 = rocketPosy2;
    currentState = state;
  });
        
  socket.on('move', (targetX, targetY, dir, room) => {
    io.to(room).emit('move', targetX, targetY, dir);
  })
        
  socket.on('price', (player1, player2, price, room) => {
    if(player1 == true){
      mat = mat - price;
    } else if(player2 == true){
      mat2 = mat2 - price;
    }
    m1 = mat;
    m2 = mat2;
    io.to(room).emit('price',m1,m2);
  })
        
  socket.on('resetTime', (timer, room) => {
    if (typeof timer !== 'undefined'){
      sec = timer;
    } else {
      sec = 20;
    }
    io.to(room).emit('resetTime', sec);
  })
        
  socket.on('time', (room) => {
    if (sec == 20){
      recent = 0;
    }
    io.to(room).emit('time', sec);
  });
        
  socket.on('turnPlayer', (m1, m2, player1, player2, capt1x15, capt2x15, capt1x2, capt2x2, rec, room) => {
    if (recent == 0 && rec == 0){
      recent = 1;
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
      io.to(room).emit('turnPlayer', m1, m2, player1, player2);
    }
  });

  socket.on('disconnect', () => {
    socket.disconnect(true)
  });

  socket.on('endGame', (data) => {
    if(recent == 0) {
      recent = 1;
      Object.entries(data).forEach(([key, value]) => {
        data[key] = value;
      });
      fetch(`/api/gameResult`, {
        method: "POST",
        body: JSON.stringify(data),
      })
      .then(function(res) { 
        return res.json()
      }).then(function() {
        socket.disconnect(true)
      })
      // call database to update game data
    } else {
      socket.disconnect(true)
    }
  })
});


const PORT = process.env.PORT || 3001;
httpsServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});