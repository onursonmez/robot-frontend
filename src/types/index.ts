export interface Robot {
  _id: string;
  serialNumber: string;
  url: string;
  status: 'IDLE' | 'IN_PROGRESS' | 'MAINTENANCE';
  connectionState: 'CONNECTED' | 'DISCONNECTED';
  state: any;
  mqttClient: {
    _id: string;
    clientId: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  };
  robotType?: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;

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
  graphId: string;
  mapId: string;
  isActive: boolean;
  nodes: Node[];
  edges: Edge[];
}

export interface Node {
  nodeId: string;
  released: boolean;
  stationType: string;
  serialNumber: string;
  nodePosition: NodePosition;
  nodeActions: NodeAction[];
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