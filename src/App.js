import React from 'react';
import LeftSidebar from './components/LeftSidebar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';
import './index.css';

const App = () => {
  return (
    <div className="flex min-h-screen bg-sky-50">
      <LeftSidebar />
      <div className="flex-1 flex">
        <MainContent />
        <RightSidebar />
      </div>
    </div>
  );
};

export default App;