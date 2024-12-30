import React, { useEffect, useState } from 'react';
import { useRobots } from '../../context/RobotsContext';
import { useDrawer } from '../../context/DrawerContext';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/Switch';
import { RobotDashboardFormProps, RobotType } from '../../types';
import RobotDetails from '../../components/robot/RobotDetails';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const RobotDashboardForm: React.FC<RobotDashboardFormProps> = ({ robot }) => {
  const { updateRobot, setInitialPose, setSelectedRobot } = useRobots();
  const { closeDrawer } = useDrawer();
  const [formData, setFormData] = useState({
    serialNumber: robot?.serialNumber || '',
  });
  const [showInformation, setShowInformation] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

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

  const handleShowRobotInformation = (robot: RobotType) => {
    if(robot){
      setSelectedRobot(robot);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-2">
        <Button className='w-1/3' type="button" variant="orange" onClick={() => robot && handleSetInitialPose(robot)}>
          Set Initial Pose
        </Button>
        <Button className='w-1/3' type="button" variant="cyan" onClick={() => console.log('Button 2 clicked')}>
          Send Goal Signal
        </Button>
        <Button className='w-1/3' type="button" variant="info" onClick={() => console.log('Button 2 clicked')}>
          Instant Action
        </Button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-100 text-sm">
          <tbody>
              <tr className="bg-gray-100">
                  <td className="px-4 py-2 font-semibold">Serial Number</td>
                  <td className="px-4 py-2 text-right">{robot?.serialNumber}</td>
              </tr>
              <tr>
                  <td className="px-4 py-2 font-semibold">Type</td>
                  <td className="px-4 py-2 text-right">{robot?.type.name}</td>
              </tr>
              <tr className="bg-gray-100">
                  <td className="px-4 py-2 font-semibold">Robot Status</td>
                  <td
                    className="px-4 py-2 font-semibold text-right"
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
                    className="px-4 py-2 font-semibold text-right"
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
                  <td className="px-4 py-2 flex justify-end">
                      <div className="w-24 h-4 bg-gray-300 rounded-full overflow-hidden mr-2">
                          <div className="h-full bg-green-500" style={{width: `${robot?.state.batteryState.batteryCharge}%`}}></div>
                      </div>
                      <span className="font-medium">{robot?.state.batteryState.batteryCharge}%</span>
                  </td>
              </tr>
              <tr>
                  <td className="px-4 py-2 font-semibold">Job ID</td>
                  <td className="px-4 py-2 text-right">{robot?.jobId}</td>
              </tr>
              <tr className="bg-gray-100">
                  <td className="px-4 py-2 font-semibold">Information</td>
                  <td align='right' className="px-4 py-2 font-semibold" onClick={() => setShowInformation(!showInformation)}>{showInformation ? <ChevronUp /> : <ChevronDown />}</td>
              </tr>
              <tr className="bg-gray-100" hidden={!showInformation}>
                  <td colSpan={2} className="px-4 pb-2 text-sm text-gray-600">
                    <div className="h-[200px] overflow-scroll text-xs relative">
                      <RobotDetails robot={robot} />
                    </div>
                  </td>
              </tr>
              <tr>
                  <td className="px-4 py-2 font-semibold">Maintenance Mode</td>
                  <td className="px-4 py-2 flex justify-end">
                    <Switch
                      isOn={isSwitchOn}
                      onChange={setIsSwitchOn}
                      size="sm"
                      onColor="bg-blue-500"
                      offColor="bg-gray-400"
                    />
                  </td>
              </tr>
              <tr className="bg-gray-100">
                  <td className="px-4 py-2 font-semibold">Laser Scan</td>
                  <td className="px-4 py-2 flex justify-end">
                    <Switch
                      isOn={isSwitchOn}
                      onChange={setIsSwitchOn}
                      size="sm"
                      onColor="bg-blue-500"
                      offColor="bg-gray-400"
                    />
                  </td>
              </tr>
              <tr>
                  <td className="px-4 py-2 font-semibold">Pause</td>
                  <td className="px-4 py-2 flex justify-end">
                    <Switch
                      isOn={isSwitchOn}
                      onChange={setIsSwitchOn}
                      size="sm"
                      onColor="bg-blue-500"
                      offColor="bg-gray-400"
                    />
                  </td>
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