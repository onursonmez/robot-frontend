import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useDrawer } from '../../context/DrawerContext';

export const Drawer: React.FC = () => {
  const { isOpen, title, content, closeDrawer } = useDrawer();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close the drawer when clicking outside of it
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeDrawer();
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        closeDrawer();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeDrawer]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg"
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={closeDrawer}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 overflow-auto h-[calc(100vh-64px)]">{content}</div>
      </div>
    </div>
  );
};