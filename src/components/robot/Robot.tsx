import React, { useEffect } from "react";  
import { useDrawer } from '../../context/DrawerContext';
import RobotDashboardForm from '../../pages/Robots/RobotDashboardForm';
import RobotInformationForm from '../../pages/Robots/RobotInformationForm';
import { RobotProps } from '../../types';
import { useRobots } from '../../context/RobotsContext';

const Robot: React.FC<RobotProps> = ({robot}) => {
  const { selectedRobot, setSelectedRobot } = useRobots();
  const { openDrawer } = useDrawer();

  const handleRobotClick = (robot: any) => {
    openDrawer(`Robot (${robot.serialNumber})`, <RobotDashboardForm robot={robot} />);
  };

  useEffect(() => {
    if (selectedRobot) {
      openDrawer('Robot Information', <RobotInformationForm robot={selectedRobot} />);
    }

    return () => {
      setSelectedRobot(null);
    }
  }, [selectedRobot]);

  return (  
    <g transform={`rotate(${robot.state?.agvPosition.theta || 0}, ${robot.state?.agvPosition.x}, ${robot.state?.agvPosition.y})`}>  
      {/* Robotun gövdesi */}  
      <rect x={robot.state?.agvPosition.x - 5} y={robot.state?.agvPosition.y - 3} rx=".5" width="10" height="6" fill="white" onClick={() => handleRobotClick(robot)} />  

      {/* Robotun yönünü gösteren ok */}  
      <text  
        x={robot.state?.agvPosition.x + 5} // Ok işareti, robotun sağında yer alır  
        y={robot.state?.agvPosition.y}  
        textAnchor="middle"  
        dominantBaseline="middle"  
        fontSize="2"  
        fill="white"
      >  
        ➤  
      </text>  

      {/* Robotun kimliği */}  
      <text  
        x={robot.state?.agvPosition.x} // Kimlik, robotun ortasında yer alır  
        y={robot.state?.agvPosition.y - 4}  
        textAnchor="middle"  
        dominantBaseline="middle"  
        fontSize="2"  
        fill="white"  
      >  
        {robot._id.slice(-4)}  
      </text>  
    </g>  
  );  
};  

export default Robot;  