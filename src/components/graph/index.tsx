import React from 'react';
import { Graph } from '@visx/network';
import { useDrawer } from '../../context/DrawerContext';
import { useGraphs } from '../../context/GraphsContext';
import { GraphAreaProps, GraphNodeData, GraphLinkData } from './types';
import { NodeForm } from './NodeForm';
import { EdgeForm } from './EdgeForm';

const GraphArea: React.FC<GraphAreaProps> = ({
  graph,
  width,
  height,
}) => {
  const { openDrawer, closeDrawer } = useDrawer();
  const { updateGraph } = useGraphs();

  const nodes: GraphNodeData[] = graph.nodes.map(node => ({
    x: node.nodePosition.x,
    y: node.nodePosition.y,
    nodeId: node.nodeId,
    released: node.released,
    stationType: node.stationType,
    allowedDeviationXY: node.nodePosition.allowedDeviationXY,
    allowedDeviationTheta: node.nodePosition.allowedDeviationTheta,
  }));

  const links: GraphLinkData[] = graph.edges.map(edge => {
    const sourceNode = nodes.find(n => n.nodeId === edge.startNodeId);
    const targetNode = nodes.find(n => n.nodeId === edge.endNodeId);
    if (!sourceNode || !targetNode) return null;

    return {
      source: sourceNode,
      target: targetNode,
      edgeId: edge.edgeId,
      released: edge.released,
      isDirected: edge.isDirected,
    };
  }).filter((link): link is GraphLinkData => link !== null);

  const handleNodeClick = (node: GraphNodeData) => {
    const originalNode = graph.nodes.find(n => n.nodeId === node.nodeId);
    if (!originalNode) return;

    openDrawer(
      <NodeForm
        node={originalNode}
        onUpdate={(updates) => {
          const updatedNodes = graph.nodes.map(n =>
            n.nodeId === node.nodeId ? { ...n, ...updates } : n
          );
          updateGraph({ ...graph, nodes: updatedNodes });
        }}
        onClose={() => closeDrawer()}
      />
    );
  };

  const handleLinkClick = (link: GraphLinkData) => {
    const originalEdge = graph.edges.find(e => e.edgeId === link.edgeId);
    if (!originalEdge) return;

    openDrawer(
      <EdgeForm
        edge={originalEdge}
        nodes={graph.nodes}
        onUpdate={(updates) => {
          const updatedEdges = graph.edges.map(e =>
            e.edgeId === link.edgeId ? { ...e, ...updates } : e
          );
          updateGraph({ ...graph, edges: updatedEdges });
        }}
        onClose={() => closeDrawer()}
      />
    );
  };

  function calculateDynamicMidpoint(link: GraphLinkData) {
    const lineLength = Math.sqrt(
      Math.pow(link.target.x - link.source.x, 2) +
      Math.pow(link.target.y - link.source.y, 2)
    );
  
    console.log("Line Length:", lineLength);

    return lineLength;
  }

  return (
    <g>
      <rect width={width} height={height} rx={0} fill="transparent" />
      <Graph
        graph={{ nodes, links }}
        top={0}
        left={0}
        nodeComponent={({ node }) => (
          <circle
            cx={node.x / 1000}
            cy={node.y / 1000}
            r={2}
            fill={node.released ? '#4CAF50' : '#FFA726'}
            stroke="#fff"
            strokeWidth={0.5}
            opacity={0.4}
            onClick={() => handleNodeClick(node as GraphNodeData)}
          />
        )
        }
        linkComponent={({ link }) => (
          <g onClick={() => handleLinkClick(link as GraphLinkData)}>
            <line
              x1={link.source.x}
              y1={link.source.y}
              x2={link.target.x}
              y2={link.target.y}
              strokeWidth={0.5}  
              stroke="#999999" 
              strokeOpacity={0.6}
              markerEnd={(link as GraphLinkData).isDirected ? `url(#arrow_${link.edgeId})` : undefined}
            />
            {(link as GraphLinkData).isDirected && (
              <defs>
                <marker
                  id={`arrow_${link.edgeId}`}
                  viewBox="0 0 10 10"
                  refX={calculateDynamicMidpoint(link) * 1.7}
                  refY={5}
                  markerWidth="6"
                  markerHeight="6"
                  opacity={0.6}
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#999" />
                </marker>
              </defs>
            )}
          </g>
        )}
      />
    </g>
  );
};

export default GraphArea;