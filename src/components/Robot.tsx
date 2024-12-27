import React from "react";  

interface RobotProps {  
  _id: any;
  state: any;
  onRobotClick?: (id: string) => void; // Robotun tıklandıgında calısacak fonksiyon
}  

const Robot: React.FC<RobotProps> = ({  
  _id,
  state,
  onRobotClick,
}) => {  
  return (  
    <g transform={`rotate(${state?.agvPosition.theta || 0}, ${state?.agvPosition.x}, ${state?.agvPosition.y})`}>  
      {/* Robotun gövdesi */}  
      <rect x={state?.agvPosition.x - 5} y={state?.agvPosition.y - 3} rx=".5" width="10" height="6" fill="white" onClick={() => onRobotClick?.(_id)} />  

      {/* Robotun yönünü gösteren ok */}  
      <text  
        x={state?.agvPosition.x + 5} // Ok işareti, robotun sağında yer alır  
        y={state?.agvPosition.y}  
        textAnchor="middle"  
        dominantBaseline="middle"  
        fontSize="2"  
        fill="white"
      >  
        ➤  
      </text>  

      {/* Robotun kimliği */}  
      <text  
        x={state?.agvPosition.x} // Kimlik, robotun ortasında yer alır  
        y={state?.agvPosition.y - 4}  
        textAnchor="middle"  
        dominantBaseline="middle"  
        fontSize="2"  
        fill="white"  
      >  
        {_id.slice(-4)}  
      </text>  
    </g>  
  );  
};  

export default Robot;  