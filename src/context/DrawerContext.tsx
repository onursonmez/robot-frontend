import React, { createContext, useContext, useState } from 'react';

interface DrawerContextType {
  isOpen: boolean;
  title: React.ReactNode | null;
  content: React.ReactNode | null;
  openDrawer: (title: string, content: React.ReactNode) => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<React.ReactNode | null>(null);
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const openDrawer = (title: string, content: React.ReactNode) => {
    setIsOpen(true);
    setTitle(title);
    setContent(content);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setTitle(null);
    setContent(null);
  };

  return (
    <DrawerContext.Provider value={{ isOpen, title, content, openDrawer, closeDrawer }}>
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