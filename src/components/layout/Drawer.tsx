import React from 'react';
import { X } from 'lucide-react';
import { useDrawer } from '../../context/DrawerContext';

export const Drawer: React.FC = () => {
  const { isOpen, content, closeDrawer } = useDrawer();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Details</h2>
          <button
            onClick={closeDrawer}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">{content}</div>
      </div>
    </div>
  );
};