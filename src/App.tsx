import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import { RobotsProvider } from './context/RobotsContext';
import { MapsProvider } from './context/MapsContext';
import { GraphsProvider } from './context/GraphsContext';
import { DrawerProvider } from './context/DrawerContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Robots } from './pages/Robots';
import { Maps } from './pages/Maps';
import { Graphs } from './pages/Graphs';

function App() {
  return (
    <Router>
      <SocketProvider>
        <RobotsProvider>
          <MapsProvider>
            <GraphsProvider>
              <DrawerProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/robots" element={<Robots />} />
                    <Route path="/maps" element={<Maps />} />
                    <Route path="/graphs" element={<Graphs />} />
                  </Routes>
                </Layout>
              </DrawerProvider>
            </GraphsProvider>
          </MapsProvider>
        </RobotsProvider>
      </SocketProvider>
    </Router>
  );
}

export default App;