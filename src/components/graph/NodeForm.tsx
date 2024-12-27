import React from 'react';
import { Node } from '../../types';
import { Button } from '../ui/Button';

interface NodeFormProps {
  node: Node;
  onUpdate: (updates: Partial<Node>) => void;
  onClose: () => void;
}

export const NodeForm: React.FC<NodeFormProps> = ({ node, onUpdate, onClose }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onUpdate({
      nodePosition: {
        ...node.nodePosition,
        x: Number(formData.get('x')),
        y: Number(formData.get('y')),
        allowedDeviationXY: Number(formData.get('allowedDeviationXY')),
        allowedDeviationTheta: Number(formData.get('allowedDeviationTheta')),
      }
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">X Position</label>
        <input
          type="number"
          name="x"
          defaultValue={node.nodePosition.x}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Y Position</label>
        <input
          type="number"
          name="y"
          defaultValue={node.nodePosition.y}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Allowed Deviation XY</label>
        <input
          type="number"
          name="allowedDeviationXY"
          defaultValue={node.nodePosition.allowedDeviationXY}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Allowed Deviation Theta</label>
        <input
          type="number"
          name="allowedDeviationTheta"
          defaultValue={node.nodePosition.allowedDeviationTheta}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
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