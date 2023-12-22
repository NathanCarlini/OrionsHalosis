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
    origin: `https://orions-halosis.vercel.app`,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
    pingTimeout: 60000,
  },
});

setInterval(timer, 1000)
let sec = 10000000;
function timer(){
  sec--;
}

let mat = 150;
let mat2 = 0;
let h1 = 0;
let h2 = 0;
let rpx1 = 0;
let rpx2 = 0;
let rpy1 = 0;
let rpy2 = 0;
let missUser = 0;
let currentState;
let recent = 0;
let state = false;
let FP = false;
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
  if (missUser == 1 && state == true){
    missUser = 0;
    console.log('second user connected after beingdisconnected');
    io.emit('loadGameState', h1, h2, rpx1, rpx2, rpy1, rpy2, currentState, FP);
  }
  if (state == false){
    console.log('a user connected');
    players = io.engine.clientsCount;
    console.log(players);
    io.emit('countInit', players);
  }
  socket.on('startGame', () => {
    state = true;
    io.emit('startGame');
  });
        
  socket.on('disconnect', () => {
    console.log('user disconnected');
    missUser = 1;
    io.emit('pause');
  });

  socket.on('props', (data, firstPlayer) => {
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
    io.emit('props', usernameP1, usernameP2, idP1, idP2);
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
        
  socket.on('move', (targetX, targetY, dir) => {
    io.emit('move', targetX, targetY, dir);
  })
        
  socket.on('price', (player1, player2, price) => {
    if(player1 == true){
      mat = mat - price;
    } else if(player2 == true){
      mat2 = mat2 - price;
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
    if (sec == 20){
      recent = 0;
    }
    io.emit('time',sec);
  });
        
  socket.on('turnPlayer', (m1, m2, player1, player2, capt1x15, capt2x15, capt1x2, capt2x2, rec) => {
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
      io.emit('turnPlayer', m1, m2, player1, player2);
    }
  });

  socket.on('endGame', (data) => {
    if(recent == 0) {
      recent = 1;
      Object.entries(data).forEach(([key, value]) => {
        data[key] = value;
      });
      fetch(`https://orions-halosis.vercel.app/api/gameResult`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      // call database to update game data
    } else return;
  })
});


const PORT = process.env.PORT || 3001;
httpsServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});