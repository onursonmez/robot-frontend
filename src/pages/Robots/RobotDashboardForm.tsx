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
        <Button className='w-1/2' type="button" variant="orange" onClick={() => robot && handleSetInitialPose(robot)}>
          Set Initial Pose
        </Button>
        <Button className='w-1/2' type="button" variant="cyan" onClick={() => console.log('Button 2 clicked')}>
          Send Goal
        </Button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-100 text-sm">
          <tbody>
              <tr className="bg-gray-100">
                  <td className="px-4 py-2 font-semibold">Serial Number</td>
                  <td className="px-4 py-2">{robot?.serialNumber}</td>
              </tr>
              <tr>
                  <td className="px-4 py-2 font-semibold">Type</td>
                  <td className="px-4 py-2">{robot?.type.name}</td>
              </tr>
              <tr className="bg-gray-100">
                  <td className="px-4 py-2 font-semibold">Robot Status</td>
                  <td
                    className="px-4 py-2 font-semibold"
                    style={{
                      color:
                        robot?.status === 'IN_PROGRESS'
                          ? ' #22C55E'
                          : robot?.status === 'IDLE'
                          ? 'gray'
                          : '#E7BA18',
                    }}
                  >
                  {robot?.status}</td>
              </tr>
              <tr>
                  <td className="px-4 py-2 font-semibold">Connection State</td>
                  <td
                    className="px-4 py-2 font-semibold"
                    style={{
                      color:
                        robot?.connection.connectionState === 'ONLINE'
                          ? '#22C55E'
                          : robot?.connection.connectionState === 'OFFLINE'
                          ? 'gray'
                          : 'red',
                    }}
                  >
                  {robot?.connection.connectionState}
                  </td>
              </tr>
              <tr className="bg-gray-100">
                  <td className="px-4 py-2 font-semibold">Battery</td>
                  <td className="px-4 py-2 flex items-center">
                      <div className="w-24 h-4 bg-gray-300 rounded-full overflow-hidden mr-2">
                          <div className="h-full bg-green-500" style={{width: `${robot?.state.batteryState.batteryCharge}%`}}></div>
                      </div>
                      <span className="font-medium">{robot?.state.batteryState.batteryCharge}%</span>
                  </td>
              </tr>
              <tr>
                  <td className="px-4 py-2 font-semibold">Job ID</td>
                  <td className="px-4 py-2">{robot?.jobId}</td>
              </tr>
          </tbody>
      </table>

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