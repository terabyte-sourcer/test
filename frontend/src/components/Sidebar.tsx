import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/upload', label: 'Upload' },
  { to: '/files', label: 'Uploaded Files' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg flex flex-col p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-10 tracking-tight">Visa Dossier</h1>
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2
              ${location.pathname === link.to ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-50'}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 