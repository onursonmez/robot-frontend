import React, { createContext, useContext, useState } from 'react';

interface DrawerContextType {
  isOpen: boolean;
  content: React.ReactNode | null;
  openDrawer: (content: React.ReactNode) => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const openDrawer = (content: React.ReactNode) => {
    setContent(content);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <DrawerContext.Provider value={{ isOpen, content, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};