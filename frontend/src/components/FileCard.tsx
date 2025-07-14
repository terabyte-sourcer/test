import React, { useEffect, useState } from 'react';

interface FileCardProps {
  fileName: string;
  url: string;
  fileType: string;
  preview?: string;
  index: number;
  onDelete?: () => void; // Optional callback for delete
}

const FileCard: React.FC<FileCardProps> = ({ fileName, url, fileType, preview, index, onDelete }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 80 * index);
    return () => clearTimeout(timeout);
  }, [index]);

  const handleDelete = () => {
    if (onDelete) return onDelete();
  };

  return (
    <div
      className={`bg-white rounded-xl shadow flex flex-col md:flex-row items-center gap-4 p-4 mb-4 border border-gray-100 transition-all duration-500 ease-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        hover:shadow-2xl hover:scale-[1.03] active:scale-95`}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="flex flex-col items-center md:items-start w-full md:w-auto flex-1">
        <a href={url} className="font-medium text-gray-800 truncate max-w-xs">{fileName} <span className="text-xs text-gray-400">({fileType})</span></a>
        {preview && (fileType.startsWith('image') || fileType === 'application/pdf') && (
          <img src={preview} alt={fileName} className="mt-2 max-h-32 rounded-lg border shadow-sm object-contain bg-gray-50 transition-all duration-300" />
        )}
        {!preview && fileType === 'application/pdf' && (
          <span className="mt-2 text-gray-400 italic">No preview available</span>
        )}
      </div>
      <button
        className="bg-red-100 text-red-600 rounded-full px-5 py-2 font-semibold shadow hover:bg-red-200 hover:scale-105 active:scale-95 transition-all duration-200"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default FileCard; 