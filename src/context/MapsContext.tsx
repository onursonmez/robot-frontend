import React, { createContext, useContext, useEffect, useState } from 'react';
import { Map } from '../types';
import { useSocket } from './SocketContext';

interface MapsContextType {
  maps: Map[];
  loading: boolean;
  error: string | null;
  createMap: (map: Omit<Map, 'mapId'>) => void;
  updateMap: (map: Map) => void;
  deleteMap: (id: string) => void;
}

const MapsContext = createContext<MapsContextType | undefined>(undefined);

export const MapsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [maps, setMaps] = useState<Map[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.emit('findAllMaps');

    socket.on('allMaps', (data: Map[]) => {
      setMaps(data);
      setLoading(false);
    });

    return () => {
      socket.off('allMaps');
    };
  }, [socket]);

  const createMap = (map: Omit<Map, 'mapId'>) => {
    if (!socket) return;
    socket.emit('mapCreate', map);
  };

  const updateMap = (map: Map) => {
    if (!socket) return;
    socket.emit('mapUpdate', map);
  };

  const deleteMap = (id: string) => {
    if (!socket) return;
    socket.emit('mapDelete', id);
  };

  return (
    <MapsContext.Provider
      value={{ maps, loading, error, createMap, updateMap, deleteMap }}
    >
      {children}
    </MapsContext.Provider>
  );
};

export const useMaps = () => {
  const context = useContext(MapsContext);
  if (context === undefined) {
    throw new Error('useMaps must be used within a MapsProvider');
  }
  return context;
};