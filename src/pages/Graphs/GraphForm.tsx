import React, { useState } from 'react';
import { useGraphs } from '../../context/GraphsContext';
import { useDrawer } from '../../context/DrawerContext';
import { Button } from '../../components/ui/Button';
import { Graph } from '../../types';

interface GraphFormProps {
  graph?: Graph;
}

export const GraphForm: React.FC<GraphFormProps> = ({ graph }) => {
  const { createGraph, updateGraph } = useGraphs();
  const { closeDrawer } = useDrawer();
  const [formData, setFormData] = useState({
    mapId: graph?.mapId || '',
    isActive: graph?.isActive || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (graph) {
      updateGraph({ ...graph, ...formData });
    } else {
      createGraph(formData as any);
    }
    closeDrawer();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Map ID</label>
        <input
          type="text"
          value={formData.mapId}
          onChange={(e) => setFormData({ ...formData, mapId: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
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
        <Button type="submit">{graph ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
};