import React from 'react';
import { Edge, Node } from '../../types';
import { Button } from '../ui/Button';

interface EdgeFormProps {
  edge: Edge;
  nodes: Node[];
  onUpdate: (updates: Partial<Edge>) => void;
  onClose: () => void;
}

export const EdgeForm: React.FC<EdgeFormProps> = ({ edge, nodes, onUpdate, onClose }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onUpdate({
      startNodeId: formData.get('startNodeId') as string,
      endNodeId: formData.get('endNodeId') as string,
      isDirected: formData.get('isDirected') === 'true',
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Node</label>
        <select
          name="startNodeId"
          defaultValue={edge.startNodeId}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          {nodes.map((node) => (
            <option key={node.nodeId} value={node.nodeId}>
              {node.nodeId}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Node</label>
        <select
          name="endNodeId"
          defaultValue={edge.endNodeId}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          {nodes.map((node) => (
            <option key={node.nodeId} value={node.nodeId}>
              {node.nodeId}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isDirected"
            defaultChecked={edge.isDirected}
            value="true"
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700">Is Directed</span>
        </label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
};