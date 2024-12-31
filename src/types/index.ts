export interface RobotType {
  _id: string;
  serialNumber: string;
  interfaceName: string;
  version: string;
  manufacturer: string;
  jobId: string;
  status: 'IDLE' | 'IN_PROGRESS' | 'MAINTENANCE' | 'CHARGING' | 'WAIT_FOR_CHARGE';
  connection: RobotTypeConnection;
  state: any;
  password: string;
  type: any;
  createdAt: string;
  updatedAt: string;
}

interface RobotTypeConnection {
  headerId: number,
  timestamp: string,
  version: string,
  manufacturer: string,
  serialNumber: string,
  connectionState: 'ONLINE' | 'OFFLINE' | 'CONNECTIONBROKEN'
}

 export interface RobotProps {  
  robot: RobotType;
}

export interface RobotDashboardFormProps {
  robot?: RobotType;
}

export interface Map {
  _id: string;
  isActive: boolean;
  robotTypes: string[];
  header: {
    frameId: string;
  };
  info: {
    resolution: number;
    width: number;
    height: number;
    origin: {
      position: {
        x: number;
        y: number;
        z: number;
      };
      orientation: {
        x: number;
        y: number;
        z: number;
        w: number;
      };
    };
  };
  zones: {
    zoneId: string;
    zoneType: string;
    areas: {
      x: number;
      y: number;
      z: number;
    }[];
  }[];
  data: number[];
  imageData: string;
  createdAt: string;
}

export interface Graph {
  _id: string;
  mapId: string;
  isActive: boolean;
  nodes: Node[];
  edges: Edge[];
}

export interface Node {
  nodeId?: string;
  released?: boolean;
  stationType?: string;
  serialNumber?: string;
  nodePosition: NodePosition;
  nodeActions?: NodeAction[];
}

export interface NodePosition {
  x: number;
  y: number;
  allowedDeviationXY: number;
  allowedDeviationTheta: number;
  mapId: string;
}

export interface NodeAction {
  robotType: string;
  actions: Action[];
}

export interface Action {
  actionId: string;
  actionType: string;
  actionDescription: string;
  actionParameters: ActionParameter[];
  resultDescription: string;
  blockingType: "SOFT" | "HARD" | "NONE";
}

export interface ActionParameter {
  key: string;
  value: number;
}

export interface Edge {
  edgeId: string;
  startNodeId: string;
  endNodeId: string;
  released: boolean;
  isDirected: boolean;
  trajectory: Trajectory;
  length: number;
  edgeActions: EdgeAction[];
}

export interface Trajectory {
  knotVector: number[];
  controlPoints: ControlPoint[];
}

export interface ControlPoint {
  x: number;
  y: number;
}

export interface EdgeAction {
  robotType: string;
  actions: Action[];
}