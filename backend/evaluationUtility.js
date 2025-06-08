const { getRoomDetails } = require("./roomUtility");

function setChoice(roomId,choice){
    const room = getRoomDetails(roomId);
    room.tossChoice = choice;
    room.gamePhase = "Tossing";
}
function setRole(roomId,choice,id){
    const room = getRoomDetails(roomId);
    if(choice=="Bat"){
        if(room.firstPlayerId==id){
            room.firstPlayerRole = "Batting";
            room.secondPlayerRole = "Bowling";
        }
        else{
            room.firstPlayerRole = "Bowling";
            room.secondPlayerRole = "Batting";
        }
    }
    else{
        if(room.firstPlayerId==id){
            room.firstPlayerRole = "Bowling";
            room.secondPlayerRole = "Batting";
        }
        else{
            room.firstPlayerRole = "Batting";
            room.secondPlayerRole = "Bowling";
        }
    }
    room.gamePhase = "Game";
    console.log("GAME PHASE: "+room.gamePhase);
    console.log(room.firstPlayerRole+" "+room.secondPlayerRole);
}
function tossEvaluation(roomId){
    const room = getRoomDetails(roomId);
    const tossChoice = room.tossChoice;
    const firstPlayerNumber = room.firstPlayerNumber;
    const secondPlayerNumber = room.secondPlayerNumber;
    const sum=firstPlayerNumber+secondPlayerNumber;
    console.log(room.tosserId+" "+room.firstPlayerId+" "+room.secondPlayerId)
    if((tossChoice=="EVEN" && (sum%2)==0) || (tossChoice=="ODD" && (sum%2)!=0)){
        room.tossWinnerId = room.tosserId;
        if(room.tossWinnerId==room.firstPlayerId){
          room.firstPlayerRole = "Selector";
          room.secondPlayerRole = "Spectator";
      }
      else{
        room.firstPlayerRole = "Spectator";
        room.secondPlayerRole = "Selector";
      }
    }
    else{
        if(room.tosserId==room.firstPlayerId){
            room.firstPlayerRole = "Spectator";
            room.secondPlayerRole = "Selector";
            room.tossWinnerId = room.secondPlayerId;
        }
        else{
          room.firstPlayerRole = "Selector";
            room.secondPlayerRole = "Spectator";
            room.tossWinnerId = room.firstPlayerId;
        }
    }
    console.log(room.tossWinnerId)
    console.log(room.firstPlayerRole+" "+room.secondPlayerRole)
    room.firstPlayerNumber = null;
    room.secondPlayerNumber = null;
    room.gamePhase = "TossResultChoice";
}
function getTossWinnerId(roomId){
    const room = getRoomDetails(roomId);
    const id = room.tossWinnerId;
    return id;
}
function evaluation(roomId){
    if(!getTossWinnerId(roomId)){
        tossEvaluation(roomId);
    }
    else{
        gameEvaluation(roomId);
    }
}

function gameEvaluation(roomId){
    const room = getRoomDetails(roomId);
    let firstPlayerNumber = room.firstPlayerNumber,secondPlayerNumber = room.secondPlayerNumber;
    if(firstPlayerNumber==secondPlayerNumber){
        if(room.gamesPlayed){
            return;
        }
        else{
            setLoading(true);
            let role = room.firstPlayerRole;
            room.firstPlayerRole = room.secondPlayerRole;
            role.secondPlayerRole = role;
            room.gamesPlayed = 1;
        }
    }
    else{
        if(room.firstPlayerRole=="Batting"){
            room.firstPlayerRuns+=firstPlayerNumber;
        }
        else{
            room.secondPlayerRuns+=secondPlayerNumber;
        }
    }
    room.firstPlayerNumber = 0;
    room.secondPlayerNumber = 0;
}

function setLoading(roomId,value){
    const room = getRoomDetails(roomId);
    room.loading = value;
}


module.exports = {setChoice,setRole,evaluation}