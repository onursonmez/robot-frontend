import React from 'react';  
import { DefaultNode, Graph } from '@visx/network';  
import { CustomNode, CustomLink, NetworkProps } from '../types/graph';

const defaultNodes: CustomNode[] = [  
  { x: 10, y: 10 },  
  { x: 50, y: 10 },  
  { x: 50, y: 50, color: '#26deb0' },  
];  

const defaultLinks: CustomLink[] = [  
  { source: defaultNodes[0], target: defaultNodes[1] },  
  { source: defaultNodes[1], target: defaultNodes[2], directed: true },  
  { source: defaultNodes[2], target: defaultNodes[0], dashed: true },  
];  

const GraphArea: React.FC<NetworkProps> = ({  
  nodes = defaultNodes,  
  links = defaultLinks,  
  width,  
  height,  
  onNodeClick,  
  onLinkClick,  
}) => {  
  const graph = { nodes, links };  

  return (  
    <g>  
      <rect width={width} height={height} rx={0} fill="transparent" />  
      <Graph<CustomLink, CustomNode>  
        graph={graph}  
        top={0}  
        left={0}  
        nodeComponent={({ node }) => (  
          <DefaultNode  
            fill={node.color || '#ff0'}
            r={2}
            onClick={() => onNodeClick?.(node)}  
          />  
        )}  
        linkComponent={({ link }) => (  
          <line  
            x1={link.source.x}  
            y1={link.source.y}  
            x2={link.target.x}  
            y2={link.target.y}  
            strokeWidth={0.5}  
            stroke="#999999" 
            strokeOpacity={0.6}  
            strokeDasharray={link.dashed ? '8,4' : undefined}  
            onClick={() => onLinkClick?.(link)}  
          />  
        )}  
      />  
    </g>  
  );  
};  

export default GraphArea;  