// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeftSidebar from './components/LeftSidebar.js';
import MyFiles from './components/MyFiles.js';
import Home from './components/Home.js';
import Favorites from './components/Favorites.js';
import SharedFiles from './components/SharedFiles.js';
import UploadFiles from './components/UploadFiles.js';
import AuthMetamask from './components/AuthMetamak.js';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-sky-50">
        <LeftSidebar />
        <div className="flex-1 flex">
          <AuthMetamask>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/shared-files" element={<SharedFiles />} />
              <Route path="/my-files" element={<MyFiles />} />
              <Route path="/upload-files" element={<UploadFiles />} />
            </Routes>
          </AuthMetamask>
        </div>
      </div>
    </Router>
  );
};

export default App;