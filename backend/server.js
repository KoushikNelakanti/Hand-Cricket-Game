const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "https://external-828o.vercel.app/",
    methods: ["GET", "POST"]
  },
  // Add reconnection options
  pingTimeout: 60000,
  pingInterval: 25000,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

const {getRoomId,printRoomData,getGamePhase,getRoomDetails} = require('./roomUtility');
const {addPlayerToRoom,setPlayerName,getOpponentName,getPlayerRole,setTosserId,getTosserId,setPlayerNumber, getMyRuns,getOpponentRuns} = require('./playerUtility');
const {setChoice,evaluation,setRole} = require('./evaluationUtility');

io.on('connection',(socket)=>{
    console.log("User Connected "+socket.id);

    socket.on('reconnectPlayer', ({ roomId, playerId }) => {
        if (roomId && playerId) {
            const room = getRoomDetails(roomId);
            if (room) {
                // Restore socket connection for the player
                socket.join(roomId);
                let playerName = '';
                let isFirstPlayer = false;
                // Update the player's new socket ID in the room and get their name
                if (room.firstPlayerId === playerId) {
                    room.firstPlayerId = socket.id;
                    playerName = room.firstPlayerName;
                    isFirstPlayer = true;
                } else if (room.secondPlayerId === playerId) {
                    room.secondPlayerId = socket.id;
                    playerName = room.secondPlayerName;
                }
                console.log(`Player ${socket.id} reconnected to room ${roomId}`);
                // Send back the player's name and game state
                socket.emit('reconnectionSuccess', {
                    playerName,
                    isFirstPlayer,
                    gamePhase: room.gamePhase,
                    playerRole: isFirstPlayer ? room.firstPlayerRole : room.secondPlayerRole,
                    runs: isFirstPlayer ? room.firstPlayerRuns : room.secondPlayerRuns
                });
            }
        }
    });
    socket.on('createRoom',(callback)=>{
        const roomId = getRoomId();
        console.log("Created Room: "+roomId);
        callback(roomId);
    })
    socket.on('addPlayer',(roomId,callback)=>{
        console.log("ROOMID: "+roomId+" ID:"+socket.id);
        const value = addPlayerToRoom(roomId,socket.id);
        const response = {
            status: "error",
            message: "Overflow of room Capacity"
        }
        if(value){
            response.status = "ok";
            response.message = "Player Added to Room Successfully";
        }
        callback(response);
    })

    socket.on('setPlayerName',(roomId,name)=>{
        setPlayerName(roomId,socket.id,name);
        console.log("Name for ID:"+socket.id+" is "+name+" in room:"+roomId);
        
    printRoomData(roomId);
    })

    socket.on('getOpponentName',(roomId,callback)=>{
        const name = getOpponentName(roomId,socket.id);
        callback(name);
    })
    socket.on('startGame',(roomId,value)=>{
        io.emit('startSignal',roomId,value);
        setTosserId(roomId);
        console.log("Tosser"+getTosserId(roomId))
    })
    
    socket.on('getTosserId',(roomId,callback)=>{
        const id = getTosserId(roomId);
        callback({id: id});
    })
    socket.on('setTossChoice',(roomId,choice)=>{
        setChoice(roomId,choice);
        console.log("Choice For RoomId: "+roomId+" "+choice);
        io.emit('numberChoiceDisplay',roomId,true);
    });
    socket.on('setTossResultChoice',(roomId,choice)=>{
        setRole(roomId,choice,socket.id);
    })
    socket.on('setPlayerNumber',(roomId,number)=>{
        setPlayerNumber(roomId,socket.id,number);
    });

    socket.on('playerRole',(roomId,callback)=>{
        const role = getPlayerRole(roomId,socket.id);
        callback({role: role});
    })
    socket.on('gamePhase',(roomId,callback)=>{
        const phase = getGamePhase(roomId);
        callback({phase: phase});
    })
    socket.on('getRuns',(roomId,callback)=>{
        const runs = getMyRuns(roomId,socket.id);
        console.log(runs);
        callback({"runs": runs});
    })
    socket.on('getOpponentRuns',(roomId,callback)=>{
        const runs = getOpponentRuns(roomId,socket.id);
        console.log(runs);

        callback({"runs": runs});
    })
    
})

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hand Cricket Server is running');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
