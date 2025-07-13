import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);
  return (
    <div className={`flex flex-col items-center justify-center min-h-[60vh] text-center transition-all duration-700 ease-out
      ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ willChange: 'transform, opacity' }}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4 tracking-tight drop-shadow">Welcome to the Visa Dossier</h1>
      <p className="mb-8 text-lg md:text-xl text-gray-600 max-w-xl">Manage and upload your visa documents efficiently with a beautiful, modern dashboard experience.</p>
      <Link to="/upload" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200">Upload a Document</Link>
    </div>
  );
};

export default Home;
