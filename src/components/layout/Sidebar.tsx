import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, Bot, Share2, MapPinned } from 'lucide-react';
import logo from '../../../public/assets/logo.png';

const navItems = [
  { to: '/', icon: MapPinned, label: 'Dashboard' },
  { to: '/robots', icon: Bot, label: 'Robots' },
  { to: '/maps', icon: Map, label: 'Maps' },
  { to: '/graphs', icon: Share2, label: 'Graphs' },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-bl from-fountainblue-500 to-fountainblue-700">
      <div className="flex h-32 p-8 items-center justify-center">
      <img src={logo} alt="Patika Robotics" />
      </div>
      <nav className="flex-1">
        <ul className="space-y-1 p-4">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 rounded-lg px-4 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};