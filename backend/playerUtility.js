const { evaluation } = require('./evaluationUtility');
const {getRoomDetails,printRoomData} = require('./roomUtility');
function addPlayerToRoom(roomId,id){
    const room = getRoomDetails(roomId);
    const p1 = room.firstPlayerId,p2 = room.secondPlayerId;
    if(!p1 && p2!=id){
        room.firstPlayerId = id;
    }
    else if(p1!=id && !p2){
        room.secondPlayerId = id;
    }
    else{
        return false;
    }
    return true;
}

function setPlayerName(roomId,id,name){
    const room = getRoomDetails(roomId);
    const p1 = room.firstPlayerId,p2 = room.secondPlayerId;
    if(p1==id){
        room.firstPlayerName = name;
    }
    else if(p2==id){
        room.secondPlayerName = name;
    }
}

function getOpponentName(roomId,id){
    const room = getRoomDetails(roomId);
    const p1 = room.firstPlayerId,p2 = room.secondPlayerId;
    if(p1==id){
        return room.secondPlayerName;
    }
    else if(p2==id){
        return room.firstPlayerName;

    }
}

function setTosserId(roomId){
    const room = getRoomDetails(roomId);
    if(room.tosserId) return;
    const randomNumber = Math.floor(Math.random() * 2);
    if(randomNumber){
        room.tosserId = room.secondPlayerId;
        room.secondPlayerRole = "Selector";
        room.firstPlayerRole = "Spectator";   
    }
    else{
        room.secondPlayerRole = "Spectator";
        room.firstPlayerRole = "Selector";
        room.tosserId = room.firstPlayerId;
    }
}

function setPlayerNumber(roomId,id,number){
    const room = getRoomDetails(roomId);
    if(room.firstPlayerId==id){
        room.firstPlayerNumber = number;
        console.log(room.firstPlayerName+" Choose: "+room.firstPlayerNumber);
    }
    else {
        room.secondPlayerNumber = number;
        console.log(room.secondPlayerName+" Choose: "+room.secondPlayerNumber);
    }
    if(room.firstPlayerNumber && room.secondPlayerNumber) evaluation(roomId);
}
function getTosserId(roomId){
    const room = getRoomDetails(roomId);
    if(!room.tosserId) setTosserId(roomId);
    return room.tosserId;
}

function getPlayerRole(roomId,id){
    const room = getRoomDetails(roomId);
    if(room.firstPlayerId==id) return room.firstPlayerRole;
    else return room.secondPlayerRole;
}

function getMyRuns(roomId,id){
    const room = getRoomDetails(roomId);
    if(room.firstPlayerId==id) return room.firstPlayerRuns;
    else return room.secondPlayerRuns;   
}

function getOpponentRuns(roomId,id){
    const room = getRoomDetails(roomId);
    if(room.firstPlayerId!=id) return room.firstPlayerRuns;
    else return room.secondPlayerRuns;   
}

module.exports = {addPlayerToRoom,setPlayerName,getOpponentName,setTosserId,getTosserId,setPlayerNumber,getPlayerRole,getMyRuns,getOpponentRuns};