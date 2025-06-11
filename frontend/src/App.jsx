import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from 'socket.io-client';
import RoomJoin from './components/RoomJoin';
import HandCricketGame from './components/HandCricketGame';
import HandCricket from './components/HandCricket';
import RoomInput from './components/RoomInput';
import LoadingSpinner from './components/LoadingSpinner';

// Create context outside the component
export const SocketContext = createContext(null);

const App = () => {
  const [socket, setSocket] = useState(null);
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    const socketobj = io('https://hand-cricket-game-m8ei.onrender.com/', {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      transports: ['websocket', 'polling'],
      autoConnect: true
    });

    socketobj.on('connect', () => {
      console.log('Connected to server');
      
      // Restore connection data from localStorage
      const storedRoomId = localStorage.getItem('roomId');
      const storedPlayerId = localStorage.getItem('playerId');
      
      if (storedRoomId && storedPlayerId) {
        socketobj.emit('reconnectPlayer', { roomId: storedRoomId, playerId: storedPlayerId });
      }
    });

    socketobj.on('connect_error', (error) => {
      console.error('Connection error:', error);
      if (!socketobj.connected && !socketobj.connecting) {
        setIsReconnecting(true);
      }
    });

    socketobj.on('disconnect', () => {
      if (!socketobj.connected && !socketobj.connecting) {
        setIsReconnecting(true);
      }
    });

    socketobj.on('reconnectionSuccess', () => {
      setIsReconnecting(false);
    });

    socketobj.on('updateRoomUrl', ({ roomId }) => {
      const currentPath = window.location.pathname;
      if (!currentPath.includes(roomId)) {
        window.history.pushState({}, '', `/hand-cricket/${roomId}`);
      }
    });

    setSocket(socketobj);

    return () => {
      socketobj.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}> {/* Pass the socket directly */}
      {isReconnecting && <LoadingSpinner />}
      <Router>
        <Routes>
          <Route path="/" element={<RoomJoin />} />
          <Route path='/join' element={<RoomInput />} />
          <Route path="/hand-cricket/:roomId" element={<HandCricket />} />
          <Route path="/hand-cricket-game/:roomId" element={<HandCricketGame />} />
        </Routes>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
