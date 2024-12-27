import React, { createContext, useContext, useEffect, useState } from 'react';
import { Robot } from '../types';
import { useSocket } from './SocketContext';

interface RobotsContextType {
  robots: Robot[];
  loading: boolean;
  error: string | null;
  createRobot: (robot: Omit<Robot, '_id'>) => void;
  updateRobot: (robot: Robot) => void;
  deleteRobot: (id: string) => void;
}

const RobotsContext = createContext<RobotsContextType | undefined>(undefined);

export const RobotsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.emit('findAllRobots', {});

    socket.on('allRobots', (data: Robot[]) => {
      setRobots(data);
      setLoading(false);
    });

    return () => {
      socket.off('allRobots');
    };
  }, [socket]);

  const createRobot = (robot: Omit<Robot, '_id'>) => {
    if (!socket) return;
    socket.emit('robotCreate', robot);
  };

  const updateRobot = (robot: Robot) => {
    if (!socket) return;
    socket.emit('robotUpdate', {id: robot._id, updateRobotDto: robot});
  };

  const deleteRobot = (id: string) => {
    if (!socket) return;
    socket.emit('robotRemove', id);
  };

  return (
    <RobotsContext.Provider
      value={{ robots, loading, error, createRobot, updateRobot, deleteRobot }}
    >
      {children}
    </RobotsContext.Provider>
  );
};

export const useRobots = () => {
  const context = useContext(RobotsContext);
  if (context === undefined) {
    throw new Error('useRobots must be used within a RobotsProvider');
  }
  return context;
};