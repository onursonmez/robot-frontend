import React, { useEffect, useState, useRef } from 'react';
import { useMaps } from '../context/MapsContext';
import { useGraphs } from '../context/GraphsContext';
import { useRobots } from '../context/RobotsContext';
import GraphArea from '../components/graph/index';
import Robot from '../components/Robot';
import { FindMousePoint } from '../components/FindMousePoint';

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
  const svgRef = useRef<SVGSVGElement | null>(null);
  const isDragging = useRef(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const [mapData, setMapData] = useState(defaultMapData); 
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

    if(activeMap) saveMapData(activeMap._id, updatedMapData); // save to LocalStorage
  };

  const handleMouseDown = (event: { clientX: number; clientY: number; }) => {
    isDragging.current = true;
    lastMousePosition.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (event: { clientX: number; clientY: number; }) => {
    if (!isDragging.current) return;

    const dx = event.clientX - lastMousePosition.current.x;
    const dy = event.clientY - lastMousePosition.current.y;

    const updatedMapData = {
      ...mapData,
      x: mapData.x - dx / 2,
      y: mapData.y - dy / 2,
    };
    
    setMapData(updatedMapData);

    if(activeMap) saveMapData(activeMap._id, updatedMapData); // save to LocalStorage

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

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
      <>
      <FindMousePoint />
      <div
       className='z-40'
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
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
              <GraphArea 
              graph={activeGraph}
              width={mapData.width}  
              height={mapData.height}
            />
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