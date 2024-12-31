import { Graph as GraphType, Node, Edge } from '../../types';

export interface GraphNodeData {
  nodeId?: string;
  released?: boolean;
  stationType?: string;
  x: number;
  y: number;
  allowedDeviationXY: number;
  allowedDeviationTheta: number;
}

export interface GraphLinkData {
  source: GraphNodeData;
  target: GraphNodeData;
  edgeId: string;
  released: boolean;
  isDirected: boolean;
}

export interface GraphAreaProps {
  graph: GraphType;
  width: number;
  height: number;
}