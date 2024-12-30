import React, { createContext, useContext, useEffect, useState } from 'react';
import { RobotType } from '../types';
import { useSocket } from './SocketContext';

interface RobotsContextType {
  robots: RobotType[];
  loading: boolean;
  error: string | null;
  initialPoseState: { robot: RobotType | null; isInitialPoseSet: boolean };
  setInitialPose: (robot: RobotType, isInitialPoseSet: boolean) => void;
  createRobot: (robot: Omit<RobotType, '_id'>) => void;
  updateRobot: (robot: RobotType) => void;
  deleteRobot: (id: string) => void;
  selectedRobot: RobotType | null;
  setSelectedRobot: (robot: RobotType | null) => void;
}

const RobotsContext = createContext<RobotsContextType | undefined>(undefined);

export const RobotsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [robots, setRobots] = useState<RobotType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { socket } = useSocket();
  const [initialPoseState, setInitialPoseState] = useState<{
    robot: RobotType | null;
    isInitialPoseSet: boolean;
  }>({
    robot: null,
    isInitialPoseSet: false,
  });
  const [selectedRobot, setSelectedRobot] = useState<RobotType | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.emit('findAllRobots', {});

    socket.on('allRobots', (data: RobotType[]) => {
      setRobots(data);
      setLoading(false);
    });

    return () => {
      socket.off('allRobots');
    };
  }, [socket]);

  const createRobot = (robot: Omit<RobotType, '_id'>) => {
    if (!socket) return;
    socket.emit('robotCreate', robot);
  };

  const updateRobot = (robot: RobotType) => {
    if (!socket) return;
    socket.emit('robotUpdate', {id: robot._id, updateRobotDto: robot});
  };

  const deleteRobot = (id: string) => {
    if (!socket) return;
    socket.emit('robotRemove', id);
  };

  const setInitialPose = (robot: RobotType, isInitialPoseSet: boolean) => {
    setInitialPoseState({ robot, isInitialPoseSet });
  };

  return (
    <RobotsContext.Provider
      value={{ 
        robots, 
        loading, 
        error, 
        createRobot, 
        updateRobot, 
        deleteRobot, 
        initialPoseState, 
        setInitialPose,
        selectedRobot,
        setSelectedRobot,
      }}
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