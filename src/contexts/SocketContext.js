import React, { createContext, useContext, useEffect } from 'react';
import { io as socketIOClient } from 'socket.io-client';

const SocketContext = createContext(null);

// Initialize socket immediately so it's available on first render
const socket = socketIOClient(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
  path: '/socket.io',
  transports: ['websocket'],
  withCredentials: true,
});

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) throw new Error('useSocket must be used within a SocketProvider');
  return socket;
}; 