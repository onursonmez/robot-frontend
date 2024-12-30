import React from 'react';
import { RobotDashboardFormProps } from '../../types';
import RobotDetails from '../../components/robot/RobotDetails';
export const RobotInformationForm: React.FC<RobotDashboardFormProps> = ({ robot }) => {

  return (
    <RobotDetails robot={robot} />
  );
};

export default RobotInformationForm;