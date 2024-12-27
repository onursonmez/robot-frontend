import React, { createContext, useContext, useEffect, useState } from 'react';
import { Graph } from '../types';
import { useSocket } from './SocketContext';

interface GraphsContextType {
  graphs: Graph[];
  loading: boolean;
  error: string | null;
  createGraph: (graph: Omit<Graph, 'graphId'>) => void;
  updateGraph: (graph: Graph) => void;
  deleteGraph: (id: string) => void;
}

const GraphsContext = createContext<GraphsContextType | undefined>(undefined);

export const GraphsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [graphs, setGraphs] = useState<Graph[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.emit('findAllGraphs');

    socket.on('allGraphs', (data: Graph[]) => {
      setGraphs(data);
      setLoading(false);
    });

    return () => {
      socket.off('allGraphs');
    };
  }, [socket]);

  const createGraph = (graph: Omit<Graph, 'graphId'>) => {
    if (!socket) return;
    socket.emit('graphCreate', graph);
  };

  const updateGraph = (graph: Graph) => {
    console.log("graph updated", graph);
    if (!socket) return;
    socket.emit('graphUpdate', graph);
  };

  const deleteGraph = (id: string) => {
    if (!socket) return;
    socket.emit('graphDelete', id);
  };

  return (
    <GraphsContext.Provider
      value={{ graphs, loading, error, createGraph, updateGraph, deleteGraph }}
    >
      {children}
    </GraphsContext.Provider>
  );
};

export const useGraphs = () => {
  const context = useContext(GraphsContext);
  if (context === undefined) {
    throw new Error('useGraphs must be used within a GraphsProvider');
  }
  return context;
};