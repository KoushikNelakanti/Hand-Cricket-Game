import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../App';

const RoomJoin = () => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [roomId, setRoomId] = useState('');

  const handleJoinRoom = () => {
    navigate('/join');
  }

  const handleCreateRoom = () => {
      socket.emit('createRoom', (id) => {
        console.log('Create');

      const newRoomId = id;
      setRoomId(newRoomId); // Update roomId with the response id

      // Emit addPlayer event once roomId is set
      
      console.log(`/hand-cricket/${newRoomId}`);
      // Navigate to the created room once roomId is available
      navigate(`/hand-cricket/${newRoomId}`);
    });
  }

  return (
// Hand Cricket Gaming Website Background & Layout with Tailwind CSS
// Combines gaming aesthetics with cricket elements

<div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
  {/* Abstract Gaming Pattern Overlay - No Cricket Elements */}
  <div className="absolute inset-0 opacity-5 bg-repeat z-0" 
       style={{
         backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjODA4MGZmIi8+PC9zdmc+')"
       }}></div>
       
  {/* Subtle Gaming Glow Effects - No Cricket Balls */}
  <div className="absolute w-72 h-72 bg-blue-600 opacity-10 blur-3xl top-20 left-10 z-0"></div>
  <div className="absolute w-96 h-96 bg-purple-600 opacity-10 blur-3xl bottom-40 right-20 z-0"></div>
  
  {/* Digital Circuit Lines - Gaming Effect */}
  <div className="absolute inset-0 z-0 opacity-20">
    <div className="absolute h-px bg-blue-400 w-full top-1/4 left-0 animate-pulse"></div>
    <div className="absolute h-px bg-purple-400 w-full top-2/4 left-0 animate-pulse delay-300"></div>
    <div className="absolute h-px bg-blue-400 w-full top-3/4 left-0 animate-pulse delay-700"></div>
    <div className="absolute w-px bg-purple-400 h-full left-1/4 top-0 animate-pulse"></div>
    <div className="absolute w-px bg-blue-400 h-full left-2/4 top-0 animate-pulse delay-300"></div>
    <div className="absolute w-px bg-purple-400 h-full left-3/4 top-0 animate-pulse delay-700"></div>
  </div>
  
  {/* Content Container */}
  <div className="relative z-10 container mx-auto py-12 px-4">
    {/* Header Area */}
    <header className="text-center mb-12">
      <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 font-gaming mb-4">HAND CRICKET</h1>
      <div className="h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"></div>
      <p className="text-blue-100 text-xl max-w-2xl mx-auto">Challenge your friends in this virtual hand cricket battleground. Show your skills and dominate the leaderboard!</p>
    </header>
    
    {/* Main Content Area */}
    <main className="backdrop-blur-sm bg-black/30 rounded-xl border border-blue-500/20 shadow-2xl shadow-purple-500/10 p-8">
      {/* Your buttons would go here */}
      <div className="flex flex-wrap justify-center items-center gap-4 my-8 px-4">
        <button 
          onClick={handleJoinRoom}
          className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-md uppercase tracking-wider transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          <span className="relative z-10">Join Room</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
        </button>
        
        <button 
          onClick={handleCreateRoom}
          className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-md uppercase tracking-wider transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <span className="relative z-10">Create Room</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
        </button>
      </div>
      
      {/* Add your game content here */}
    </main>
    
    {/* Footer Area */}
    <footer className="mt-12 text-center text-blue-200/70 text-sm">
      <p>© 2025 Hand Cricket Game | A Virtual Cricket Gaming Experience</p>
    </footer>
  </div>
  
  {/* Modern Gaming Corner Accents */}
  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent z-0"></div>
  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent z-0"></div>
</div>

  );

 
}

export default RoomJoin;
