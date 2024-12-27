import React, { useState } from 'react';
import { useMaps } from '../../context/MapsContext';
import { useDrawer } from '../../context/DrawerContext';
import { Button } from '../../components/ui/Button';
import { Map } from '../../types';

interface MapFormProps {
  map?: Map;
}

export const MapForm: React.FC<MapFormProps> = ({ map }) => {
  const { createMap, updateMap } = useMaps();
  const { closeDrawer } = useDrawer();
  const [formData, setFormData] = useState({
    isActive: map?.isActive || false,
    robotTypes: map?.robotTypes || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (map) {
      updateMap({ ...map, ...formData });
    } else {
      createMap(formData as any);
    }
    closeDrawer();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700">Active</span>
        </label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={closeDrawer}>
          Cancel
        </Button>
        <Button type="submit">{map ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
};