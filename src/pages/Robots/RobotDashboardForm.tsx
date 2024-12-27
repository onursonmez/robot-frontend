// src/pages/Robots/RobotDashboardForm.tsx
import React, { useState } from 'react';
import { useRobots } from '../../context/RobotsContext';
import { useDrawer } from '../../context/DrawerContext';
import { Button } from '../../components/ui/Button';
import { RobotDashboardFormProps, RobotType } from '../../types';

export const RobotDashboardForm: React.FC<RobotDashboardFormProps> = ({ robot }) => {
  const { updateRobot, setInitialPose } = useRobots();
  const { closeDrawer } = useDrawer();
  const [formData, setFormData] = useState({
    serialNumber: robot?.serialNumber || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (robot) {
      updateRobot({ ...robot, ...formData });
    }
    closeDrawer();
  };

  const handleSetInitialPose = (robot: RobotType) => {
    if (robot) {
      setInitialPose(robot, true);
      closeDrawer();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-2">
        <Button className='w-1/2' type="button" variant="primary" onClick={() => robot && handleSetInitialPose(robot)}>
          SET INITIAL POSE
        </Button>
        <Button className='w-1/2' type="button" variant="primary" onClick={() => console.log('Button 2 clicked')}>
          SEND GOAL
        </Button>
      </div>

      <div>
        Serial Number: {robot.serialNumber}
      </div>
      <div>
        Robot Status: {robot.status}
      </div>
      <div>
        Connection State: {robot?.connectionState}
      </div>
      <div>
        Battery: {robot?.state.batteryState.batteryCharge}
      </div>
      <div>
        Job ID: {robot?.state.batteryState.batteryCharge}
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={closeDrawer}>
          Cancel
        </Button>
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
};

export default RobotDashboardForm;