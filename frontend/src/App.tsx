import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUpload from './pages/FileUpload';
import FileList from './pages/FileList';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import CustomToaster from './components/CustomToaster';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<FileUpload />} />
              <Route path="/files" element={<FileList />} />
            </Routes>
          </div>
        </main>
        <CustomToaster />
      </div>
    </Router>
  );
};

export default App;
