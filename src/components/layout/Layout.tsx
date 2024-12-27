import React from 'react';
import { Sidebar } from './Sidebar';
import { Drawer } from './Drawer';
import { useLocation } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className={location.pathname === '/' ? "overflow-hidden w-screen h-screen flex-1 bg-fountainblue-900" : "flex-1 overflow-auto bg-gray-100 p-8"}
      >{children}</main>

      <Drawer />
    </div>
  );
};