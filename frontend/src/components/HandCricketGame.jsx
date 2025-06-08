import React, { useContext, useEffect, useState, useRef } from 'react'
import { SocketContext } from '../App';
import { useNavigate, useParams } from 'react-router-dom';
import NumberGrid from './NumberGrid';
const HandCricketGame = () => {
  const {roomId} = useParams();
  const socket = useContext(SocketContext);
  const [playerName,setPlayerName] = useState(null);
  const [opponentName,setOpponentName] = useState(null);
  const [gamePhase,setGamePhase] = useState('');
  const [playerRole,setPlayerRole] = useState('');
  const [number,setNumber] = useState(0);
  const [runs,setRuns] = useState(0);
  const [opponentRuns,setOpponentRuns] = useState(0);
  const [choice,setChoice] = useState('');
  const [message,setMessage] = useState('');
  const [displayMesssage,setDisplayMessage] = useState(false);
  const [glowEffect, setGlowEffect] = useState(false);
  const [gameEvent, setGameEvent] = useState('');
  const [auraColor, setAuraColor] = useState('blue');
  const scoreAudioRef = useRef(null);
  const outAudioRef = useRef(null);
  const opponentScoreAudioRef = useRef(null);

  // Aura color mapping
  const auraColors = {
    blue: 'from-blue-600/30 to-purple-600/30',
    orange: 'from-orange-600/30 to-red-600/30',
    red: 'from-red-600/30 to-pink-600/30'
  };
  
  // useEffect for fetching the GamePhase
  useEffect(() => {
    if (gamePhase=="Game" || !socket) return;

    const fetchGamePhase = () => {
        console.log('Requesting GamePhase for room:', roomId); // Debug log

        socket.emit('gamePhase', roomId, (response) => {
            console.log('Server response:', response); // Debug log
            if (response && response.phase) {
              setGamePhase(response.phase);
              console.log("GamePhase: "+gamePhase);
            } 
          });
          setTimeout(fetchGamePhase, 1000);
    };

    fetchGamePhase();
}, [gamePhase, socket, roomId]);

  // useEffect for fetching the PlayerRole
useEffect(() => {
  if (!socket) return;

  const fetchPlayerRole = () => {
    console.log('Requesting PlayerRole for room:', roomId);

    socket.emit('playerRole', roomId, (response) => {
      console.log('Server response:', response);
      if (response && response.role) {
        setPlayerRole(response.role); // Correct attribute
      } else {
        console.log('Retrying playerRole...');
      }
    });
    setTimeout(fetchPlayerRole, 1000);
  };

  fetchPlayerRole();
}, [socket, roomId]);


// useEffect for fetching setting up the Choice
useEffect(()=>{
  if(!socket || choice.length==0) return;
  if(gamePhase=="TossChoice"){
    socket.emit('setTossChoice',roomId,choice);
  }
  else if(gamePhase=="TossResultChoice"){
    socket.emit('setTossResultChoice',roomId,choice);
  }
  else{
    setChoice('');
  }
},[roomId,socket,choice])

// useEffect for setting up the number choice
useEffect(()=>{
  if(!socket || number==0) return;
  console.log("CHOOSEN NUMBER: "+number)
  socket.emit('setPlayerNumber',roomId,number);
  setNumber(0);
  setGlowEffect(true);
  setTimeout(() => setGlowEffect(false), 1000);
},[number]);

useEffect(() => {
  if (gamePhase!="Game" || !socket) return;

  const fetchMyRuns = () => {
      console.log('Requesting Get Runs for room:', roomId);

      socket.emit('getRuns', roomId, (response) => {
          console.log('Server response:', response);
          if (response && response.runs) {
            setRuns(response.runs);
            setGameEvent('player_score');
            setGlowEffect(true);
            setAuraColor('blue');
            setTimeout(() => {
              setGameEvent('');
              setGlowEffect(false);
            }, 1000);
            console.log("Runs: "+runs);
          } else if (response && response.out) {
            setGameEvent('out');
            setGlowEffect(true);
            setAuraColor('red');
            setTimeout(() => {
              setGameEvent('');
              setGlowEffect(false);
            }, 1000);
          }
        });
        setTimeout(fetchMyRuns,1000);
  };

  fetchMyRuns();
}, [gamePhase, socket, roomId]);

useEffect(() => {
  if (gamePhase!="Game" || !socket) return;

  const fetchOpponentRuns = () => {
      console.log('Requesting Get Opponent Runs for room:', roomId);

      socket.emit('getOpponentRuns', roomId, (response) => {
          console.log('Server response:', response);
          if (response && response.runs) {
            setOpponentRuns(response.runs);
            setGameEvent('opponent_score');
            setGlowEffect(true);
            setAuraColor('orange');
            setTimeout(() => {
              setGameEvent('');
              setGlowEffect(false);
            }, 1000);
            console.log("Opponent Runs: "+opponentRuns);
          } 
        });
        setTimeout(fetchOpponentRuns, 1000);
  };

  fetchOpponentRuns();
}, [gamePhase, socket, roomId]);


if(gamePhase=="Game"){
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Room ID Display */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 backdrop-blur-sm bg-black/30 rounded-xl border border-blue-500/20 shadow-2xl shadow-purple-500/10 px-6 py-3 z-20">
        <div className="text-lg text-center">
          <span className="text-blue-300">Room ID: </span>
          <span className="text-purple-300 font-semibold">{roomId}</span>
        </div>
      </div>
      {/* Dynamic Aura Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${auraColors[auraColor]} blur-3xl transition-colors duration-1000 ease-in-out`}></div>
      
      {/* Role Display */}
      <div className="relative z-10 mb-8 text-center mt-16">
        <div className="inline-block backdrop-blur-sm bg-black/30 rounded-xl border border-blue-500/20 shadow-2xl shadow-purple-500/10 px-8 py-4 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {playerRole === 'Batting' ? '🏏 You are Batting' : playerRole === 'Bowling' ? '⚾ You are Bowling' : 'Waiting...'}
          </h2>
        </div>
      </div>
      {/* Subtle Gaming Glow Effects */}
      <div className="absolute w-72 h-72 bg-blue-600 opacity-10 blur-3xl top-20 left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-600 opacity-10 blur-3xl bottom-20 right-10"></div>
      
      {/* Abstract Gaming Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 bg-repeat" 
           style={{
             backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjODA4MGZmIi8+PC9zdmc+')"
           }}></div>
           
      {/* Digital Circuit Lines - Gaming Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute h-px bg-blue-400 w-full top-1/4 left-0 animate-pulse"></div>
        <div className="absolute h-px bg-purple-400 w-full top-2/4 left-0 animate-pulse delay-300"></div>
        <div className="absolute h-px bg-blue-400 w-full top-3/4 left-0 animate-pulse delay-700"></div>
        <div className="absolute w-px bg-purple-400 h-full left-1/4 top-0 animate-pulse"></div>
        <div className="absolute w-px bg-blue-400 h-full left-2/4 top-0 animate-pulse delay-300"></div>
        <div className="absolute w-px bg-purple-400 h-full left-3/4 top-0 animate-pulse delay-700"></div>
      </div>

      {/* Score Display */}
      <div className={`backdrop-blur-sm bg-black/30 rounded-xl border border-blue-500/20 shadow-2xl ${glowEffect ? 'animate-pulse shadow-purple-500/50' : 'shadow-purple-500/10'} p-6 mb-8 transition-all duration-300`}>
        <h1 className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${glowEffect ? 'from-blue-300 to-purple-400 scale-110' : 'from-blue-400 to-purple-500'} transition-all duration-300`}>{runs}-{opponentRuns}</h1>
      </div>

      {/* Score Display */}
      <div className="mb-8 relative">
        <div className={`text-6xl font-bold text-center ${gameEvent === 'player_score' ? 'text-blue-400' : gameEvent === 'opponent_score' ? 'text-orange-400' : 'text-white'} transition-colors duration-300`}>
          {number || '?'}
        </div>
        <div className={`absolute inset-0 -z-10 blur-xl opacity-50 ${gameEvent === 'player_score' ? 'bg-blue-500' : gameEvent === 'opponent_score' ? 'bg-orange-500' : 'bg-purple-500'} transition-colors duration-300`}></div>
      </div>

      {/* Number Grid Component */}
      <NumberGrid number={number} setNumber={setNumber}/>

      {/* Audio elements for sound effects */}
      <audio ref={scoreAudioRef} src="/music/score.mp3" preload="auto" />
      <audio ref={outAudioRef} src="/music/out.mp3" preload="auto" />
      <audio ref={opponentScoreAudioRef} src="/music/opponent_score.mp3" preload="auto" />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent"></div>
    </div>
  )
}
else if(gamePhase=="Tossing"){
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        {/* Room ID Display */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 backdrop-blur-sm bg-black/30 rounded-xl border border-blue-500/20 shadow-2xl shadow-purple-500/10 px-6 py-3 z-20">
          <div className="text-lg text-center">
            <span className="text-blue-300">Room ID: </span>
            <span className="text-purple-300 font-semibold">{roomId}</span>
          </div>
        </div>

        {/* Role Display */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 backdrop-blur-sm bg-black/30 rounded-xl border border-blue-500/20 shadow-2xl shadow-purple-500/10 px-6 py-3 z-20">
          <div className="text-lg text-center">
            <span className="text-blue-300">Role: </span>
            <span className="text-purple-300 font-semibold">{playerRole || 'Waiting...'}</span>
          </div>
        </div>
          {/* Subtle Gaming Glow Effects */}
          <div className="absolute w-72 h-72 bg-blue-600 opacity-10 blur-3xl top-20 left-10"></div>
        <div className="absolute w-96 h-96 bg-purple-600 opacity-10 blur-3xl bottom-20 right-10"></div>
        
        {/* Abstract Gaming Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-repeat" 
             style={{
               backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjODA4MGZmIi8+PC9zdmc+')"
             }}></div>
             
        {/* Digital Circuit Lines - Gaming Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute h-px bg-blue-400 w-full top-1/4 left-0 animate-pulse"></div>
          <div className="absolute h-px bg-purple-400 w-full top-2/4 left-0 animate-pulse delay-300"></div>
          <div className="absolute h-px bg-blue-400 w-full top-3/4 left-0 animate-pulse delay-700"></div>
          <div className="absolute w-px bg-purple-400 h-full left-1/4 top-0 animate-pulse"></div>
          <div className="absolute w-px bg-blue-400 h-full left-2/4 top-0 animate-pulse delay-300"></div>
          <div className="absolute w-px bg-purple-400 h-full left-3/4 top-0 animate-pulse delay-700"></div>
        </div>

        {/* Number Grid Component */}
        <NumberGrid number={number} setNumber={setNumber}/>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent"></div>
      </div>
    )
}
else if(gamePhase=="TossResultChoice"){
  const handleBat = ()=>{
    setChoice("Bat");
  }
  const handleBowl = ()=>{
    setChoice("Bowl");
  }
  if(playerRole=="Selector"){
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        {/* Room ID Display */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 backdrop-blur-sm bg-black/30 rounded-xl border border-blue-500/20 shadow-2xl shadow-purple-500/10 px-6 py-3 z-20">
          <div className="text-lg text-center">
            <span className="text-blue-300">Room ID: </span>
            <span className="text-purple-300 font-semibold">{roomId}</span>
          </div>
        </div>
        {/* Subtle Gaming Glow Effects */}
        <div className="absolute w-72 h-72 bg-blue-600 opacity-10 blur-3xl top-20 left-10"></div>
        <div className="absolute w-96 h-96 bg-purple-600 opacity-10 blur-3xl bottom-20 right-10"></div>
        
        {/* Abstract Gaming Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-repeat" 
             style={{
               backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjODA4MGZmIi8+PC9zdmc+')"
             }}></div>
             
        {/* Digital Circuit Lines - Gaming Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute h-px bg-blue-400 w-full top-1/4 left-0 animate-pulse"></div>
          <div className="absolute h-px bg-purple-400 w-full top-2/4 left-0 animate-pulse delay-300"></div>
          <div className="absolute h-px bg-blue-400 w-full top-3/4 left-0 animate-pulse delay-700"></div>
          <div className="absolute w-px bg-purple-400 h-full left-1/4 top-0 animate-pulse"></div>
          <div className="absolute w-px bg-blue-400 h-full left-2/4 top-0 animate-pulse delay-300"></div>
          <div className="absolute w-px bg-purple-400 h-full left-3/4 top-0 animate-pulse delay-700"></div>
        </div>
        
        {/* Choice Container */}
        <div className="backdrop-blur-sm bg-black/30 rounded-xl border border-blue-500/20 shadow-2xl shadow-purple-500/10 p-6 max-w-md w-full relative z-10">
          <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 uppercase tracking-wider">Choose Your Role</h1>
          
          <div className="space-y-4">
            <button 
              onClick={handleBat}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-md uppercase tracking-wider transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              <span className="relative z-10">Batting</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </button>
            
            <button 
              onClick={handleBowl}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-md uppercase tracking-wider transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <span className="relative z-10">Bowling</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </button>
          </div>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mt-6"></div>
        </div>
        
        {/* Modern Gaming Corner Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent"></div>
      </div>
    );
  }
  else{
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <div className="backdrop-blur-sm bg-black/30 rounded-xl border border-blue-500/20 shadow-2xl shadow-purple-500/10 p-8 mb-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex justify-between items-center gap-8">
            <div className="text-center">
              <div className="text-sm font-medium text-blue-400 mb-1">YOU</div>
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500 animate-pulse">{runs}</div>
            </div>
            <div className="text-4xl font-bold text-blue-500/50">-</div>
            <div className="text-center">
              <div className="text-sm font-medium text-purple-400 mb-1">OPPONENT</div>
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-500 animate-pulse">{opponentRuns}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
else if(gamePhase=="TossChoice"){
  console.log("I am not running");
  const handleEven = ()=>{
    setChoice("EVEN");
  }
  const handleOdd = ()=>{
    setChoice("ODD");
  }
  if(playerRole=="Selector"){
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        {/* Subtle Gaming Glow Effects */}
        <div className="absolute w-72 h-72 bg-blue-600 opacity-10 blur-3xl top-20 left-10"></div>
        <div className="absolute w-96 h-96 bg-purple-600 opacity-10 blur-3xl bottom-20 right-10"></div>
        
        {/* Abstract Gaming Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-repeat" 
             style={{
               backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjODA4MGZmIi8+PC9zdmc+')"
             }}></div>
             
        {/* Digital Circuit Lines - Gaming Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute h-px bg-blue-400 w-full top-1/4 left-0 animate-pulse"></div>
          <div className="absolute h-px bg-purple-400 w-full top-2/4 left-0 animate-pulse delay-300"></div>
          <div className="absolute h-px bg-blue-400 w-full top-3/4 left-0 animate-pulse delay-700"></div>
          <div className="absolute w-px bg-purple-400 h-full left-1/4 top-0 animate-pulse"></div>
          <div className="absolute w-px bg-blue-400 h-full left-2/4 top-0 animate-pulse delay-300"></div>
          <div className="absolute w-px bg-purple-400 h-full left-3/4 top-0 animate-pulse delay-700"></div>
        </div>
        
        {/* Choice Container */}
        <div className="backdrop-blur-sm bg-black/30 rounded-xl border border-blue-500/20 shadow-2xl shadow-purple-500/10 p-6 max-w-md w-full relative z-10">
          <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 uppercase tracking-wider">Choose Your Call</h1>
          
          <div className="space-y-4">
            <button 
              onClick={handleEven}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-md uppercase tracking-wider transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              <span className="relative z-10">Even</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </button>
            
            <button 
              onClick={handleOdd}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-md uppercase tracking-wider transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <span className="relative z-10">Odd</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </button>
          </div>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mt-6"></div>
        </div>
        
        {/* Modern Gaming Corner Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent"></div>
      </div>
    );
  }
  else{
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <div className="backdrop-blur-sm bg-black/30 rounded-xl border border-blue-500/20 shadow-2xl shadow-purple-500/10 p-6 max-w-md w-full relative z-10">
          <h1 className="text-2xl text-center text-blue-100 font-semibold">Opponent is selecting toss choice: Even or Odd</h1>
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }
}
}



export default HandCricketGame
