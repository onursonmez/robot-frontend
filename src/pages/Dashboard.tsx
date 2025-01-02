import React, { useEffect, useState, useRef } from 'react';
import { useMaps } from '../context/MapsContext';
import { useGraphs } from '../context/GraphsContext';
import { useRobots } from '../context/RobotsContext';
import { useDrawer } from '../context/DrawerContext';
import { Graph } from '@visx/network';
import { GraphDots } from '../components/graph/GraphDots';
import { GraphNodeData, GraphLinkData } from '../components/graph/types';
import { NodeForm } from '../components/graph/NodeForm';
import { EdgeForm } from '../components/graph/EdgeForm';
import Robot from '../components/robot/Robot';
import RobotPose from '../components/robot/RobotPose';

const defaultMapData = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  angle: 0,
  initialWidth: 100,
  initialHeight: 100,
};

export const Dashboard: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const isDragging = useRef(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const [mapData, setMapData] = useState(defaultMapData);
  const [newNodeMode, setNewNodeMode] = useState(true);
  const { maps, loading: mapsLoading } = useMaps();
  const { graphs, loading: graphsLoading } = useGraphs();
  const { robots, loading: robotsLoading } = useRobots();
  const isLoading = mapsLoading || graphsLoading || robotsLoading;

  const activeMap = maps.find((map) => map.isActive);
  const activeGraph = graphs.find((graph) => graph.isActive && graph.mapId === activeMap?._id);
  const activeRobots = robots.filter((robot) => activeMap?.robotTypes.includes(robot.type?._id || ''));

  useEffect(() => {
    if (activeMap) {
      const savedData = loadMapData(activeMap._id, defaultMapData);
      setMapData(savedData);
    }
  }, [activeMap]);

  const handleWheel = (event: any) => {
    if (!svgRef.current) return;

    const zoomFactor = 0.1; // Zoom sensitivity
    const scale = event.deltaY > 0 ? 1 + zoomFactor : 1 - zoomFactor;

    // Get mouse position relative to the SVG element
    const svgRect = svgRef.current.getBoundingClientRect();
    const mouseX = event.clientX - svgRect.left;
    const mouseY = event.clientY - svgRect.top;

    // Convert mouse position to SVG coordinates
    const svgMouseX = mapData.x + (mouseX / svgRect.width) * mapData.width;
    const svgMouseY = mapData.y + (mouseY / svgRect.height) * mapData.height;

    const newWidth = mapData.width * scale;
    const newHeight = mapData.height * scale;
    const newX = svgMouseX - (svgMouseX - mapData.x) * scale;
    const newY = svgMouseY - (svgMouseY - mapData.y) * scale;

    const updatedMapData = {
      ...mapData,
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
    };

    setMapData(updatedMapData);

    if (activeMap) saveMapData(activeMap._id, updatedMapData); // save to LocalStorage
  };

  const handleClick = (event: { clientX: number; clientY: number; }) => {

    //Haritanin koordinatlarini ekrana bas
    if (svgRef.current && activeGraph && activeMap) {
      const svg = svgRef.current;
      const point = svg.createSVGPoint(); // SVGPoint oluştur
      point.x = event.clientX; // Mouse'un ekran üzerindeki X pozisyonu
      point.y = event.clientY; // Mouse'un ekran üzerindeki Y pozisyonu

      // Ekran koordinatlarını SVG koordinatlarına dönüştür
      const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
      setMousePosition({ x: svgPoint.x, y: svgPoint.y });

      // Yeni nodeId'yi belirle
      const nextNodeId = Math.max(...activeGraph.nodes.map(n => Number(n.nodeId))) + 1;

      //Yeni node icerigi
      const newNode = {
        nodeId: 'node' + String(nextNodeId),
        released: false,
        stationType: '',
        serialNumber: '',
        nodePosition: {
          mapId: activeMap._id,
          x: Math.floor(svgPoint.x),
          y: Math.floor(svgPoint.y),
          allowedDeviationXY: Number(0),
          allowedDeviationTheta: Number(0),
        },
      }

      // Yeni node'u array'e ekle
      const updatedNodes = [...activeGraph.nodes, newNode];

      // graph objesini güncelle
      updateGraph({ ...activeGraph, nodes: updatedNodes });
    }
  };

  const handleMouseDown = (event: { clientX: number; clientY: number; }) => {
    isDragging.current = true;
    lastMousePosition.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (event: { clientX: number; clientY: number; }) => {

    //Haritanin koordinatlarini ekrana bas
    if (svgRef.current) {
      const svg = svgRef.current;
      const point = svg.createSVGPoint(); // SVGPoint oluştur
      point.x = event.clientX; // Mouse'un ekran üzerindeki X pozisyonu
      point.y = event.clientY; // Mouse'un ekran üzerindeki Y pozisyonu

      // Ekran koordinatlarını SVG koordinatlarına dönüştür
      const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
      setMousePosition({ x: svgPoint.x, y: svgPoint.y });
    }

    if (!isDragging.current) return;

    const dx = event.clientX - lastMousePosition.current.x;
    const dy = event.clientY - lastMousePosition.current.y;

    const updatedMapData = {
      ...mapData,
      x: mapData.x - dx / 2,
      y: mapData.y - dy / 2,
    };

    setMapData(updatedMapData);

    if (activeMap) saveMapData(activeMap._id, updatedMapData); // save to LocalStorage

    lastMousePosition.current = { x: event.clientX, y: event.clientY };
  };

  const loadMapData = (mapId: string, defaultData: any) => {
    const savedData = localStorage.getItem(`map_${mapId}`);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return defaultData; // if data doesn't exist, return the default data
  };

  const saveMapData = (mapId: string, data: any) => {
    localStorage.setItem(`map_${mapId}`, JSON.stringify(data));
  };

  const handleMouseLeave = () => {
    setMousePosition(null); // Mouse SVG'den çıktığında koordinatları temizle
  };




  const { openDrawer, closeDrawer } = useDrawer();
  const { updateGraph } = useGraphs();

  const nodes: GraphNodeData[] = activeGraph?.nodes.map(node => ({
    nodeId: node.nodeId,
    released: node.released,
    stationType: node.stationType,
    x: node.nodePosition.x,
    y: node.nodePosition.y,
    allowedDeviationXY: node.nodePosition.allowedDeviationXY,
    allowedDeviationTheta: node.nodePosition.allowedDeviationTheta,
  }));

  const links: GraphLinkData[] = activeGraph?.edges.map(edge => {
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
    const originalNode = activeGraph?.nodes.find(n => n.nodeId === node.nodeId);
    if (!originalNode) return;

    openDrawer(
      `Node (${node.nodeId})`,
      <NodeForm
        node={originalNode}
        onUpdate={(updates) => {
          const updatedNodes = activeGraph.nodes.map(n =>
            n.nodeId === node.nodeId ? { ...n, ...updates } : n
          );
          updateGraph({ ...activeGraph, nodes: updatedNodes });
        }}
        onClose={() => closeDrawer()}
      />
    );
  };

  const handleLinkClick = (link: GraphLinkData) => {
    const originalEdge = activeGraph?.edges.find(e => e.edgeId === link.edgeId);
    if (!originalEdge) return;

    openDrawer(
      `Edge (${link.source.nodeId} - ${link.target.nodeId})`,
      <EdgeForm
        edge={originalEdge}
        nodes={activeGraph.nodes}
        onUpdate={(updates) => {
          const updatedEdges = activeGraph.edges.map(e =>
            e.edgeId === link.edgeId ? { ...e, ...updates } : e
          );
          updateGraph({ ...activeGraph, edges: updatedEdges });
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
    return lineLength;
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <GraphDots graph={activeGraph} />
          <RobotPose />
          <div
            className={`z-40 ${newNodeMode ? "cursor-custom" : "cursor-default"
              }`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            {mousePosition && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  fontSize: '12px',
                  zIndex: 100,
                }}
              >
                X: {mousePosition.x.toFixed(2)}, Y: {mousePosition.y.toFixed(2)}
              </div>
            )}
            <svg
              ref={svgRef}
              className="viewport"
              viewBox={`${mapData.x} ${mapData.y} ${mapData.width} ${mapData.height}`}
              xmlns="http://www.w3.org/2000/svg"
            >

              <defs>
                <pattern id="dotPattern" width="5" height="5" patternUnits="userSpaceOnUse">
                  <circle cx="0" cy="0" r=".2" fill="lightgray" />
                  <circle cx="5" cy="0" r=".2" fill="lightgray" />
                  <circle cx="0" cy="5" r=".2" fill="lightgray" />
                  <circle cx="5" cy="5" r=".2" fill="lightgray" />
                </pattern>
              </defs>

              {/* Outer Rectangle dynamically bound to initialMaps */}
              <g transform={`rotate(${mapData.angle}, 0, 0)`}>
                <rect
                  x="0"
                  y="0"
                  width={mapData.initialWidth}
                  height={mapData.initialHeight}
                  fill="url(#dotPattern)"
                  stroke="lightgray"
                  strokeWidth=".5"
                  rx={1}
                />

                <rect
                  x="60"
                  y="60"
                  width="40"
                  height="40"
                  fill="lightgray"
                  stroke="lightgray"
                  strokeWidth=".5"
                  rx={1}
                />

                {activeGraph && (
                  <g>
                    <rect width={mapData.width} height={mapData.width} rx={0} fill="transparent" />
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
                            strokeWidth={1}
                            stroke="#999999"
                            strokeOpacity={0.6}
                            markerEnd={(link as GraphLinkData).isDirected ? `url(#arrow_${link.edgeId})` : undefined}
                          />
                          {(link as GraphLinkData).isDirected && (
                            <defs>
                              <marker
                                id={`arrow_${link.edgeId}`}
                                viewBox="0 0 10 10"
                                refX={calculateDynamicMidpoint(link) * 1.3}
                                refY={5}
                                markerWidth="4"
                                markerHeight="4"
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
                )}

                {/* Robots */}
                {activeRobots.map((robot) => (
                  <Robot key={robot._id} robot={robot} />
                ))}
              </g>
            </svg>
          </div>
        </>
      )}
    </>
  );
};