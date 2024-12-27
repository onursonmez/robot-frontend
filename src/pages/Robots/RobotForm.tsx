import React, { useState } from 'react';
import { useRobots } from '../../context/RobotsContext';
import { useDrawer } from '../../context/DrawerContext';
import { Button } from '../../components/ui/Button';
import { RobotType } from '../../types';

interface RobotFormProps {
  robot?: RobotType;
}

export const RobotForm: React.FC<RobotFormProps> = ({ robot }) => {
  const { createRobot, updateRobot } = useRobots();
  const { closeDrawer } = useDrawer();
  const [formData, setFormData] = useState({
    serialNumber: robot?.serialNumber || '',
    url: robot?.url || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (robot) {
      updateRobot({ ...robot, ...formData });
    } else {
      createRobot(formData as any);
    }
    closeDrawer();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Serial Number
        </label>
        <input
          type="text"
          value={formData.serialNumber}
          onChange={(e) =>
            setFormData({ ...formData, serialNumber: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">MQTT Username</label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">MQTT Password</label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Robot Type</label>
        <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
        <option>PTK1350</option>
        <option>PTK1000</option>
        <option>-- Add New --</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={closeDrawer}>
          Cancel
        </Button>
        <Button type="submit">{robot ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
};