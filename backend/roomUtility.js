const rooms = {};

function generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function getRoomId(){
    return generateRoomId();
}

function createTemplate(roomId) {
    rooms[roomId] = {
        roomId: roomId,
        firstPlayerId: null,
        secondPlayerId: null,
        firstPlayerName: null,
        secondPlayerName: null,
        firstPlayerNumber: null,
        secondPlayerNumber: null,
        firstPlayerRole: null,
        secondPlayerRole: null,
        firstPlayerRuns: 0,
        secondPlayerRuns: 0,
        tossChoice: null,
        gamePhase: "TossChoice",
        tossWinnerId: null,
        tosserId: null,
        gameMessage: '',
        gamesPlayed:0,
        loading: false,
    };
    console.log('Created room template:', roomId);
}

function getRoomDetails(roomId){
    if(!rooms[roomId]){
        createTemplate(roomId);
    }
    return rooms[roomId];
}
function printRoomData(roomId){
    console.log("ROOM:"+roomId);
    console.log("Player1 Id:"+rooms[roomId].firstPlayerId);
    console.log("Player2 Id:"+rooms[roomId].secondPlayerId);
    console.log("Player1 Name:"+rooms[roomId].firstPlayerName);
    console.log("Player2 Name:"+rooms[roomId].secondPlayerName);


}

function getGamePhase(roomId){
    if(!roomId) return "TossChoice";
    const phase = rooms[roomId].gamePhase;
    return phase;
}

module.exports = {getRoomId,getRoomDetails,printRoomData,getGamePhase};