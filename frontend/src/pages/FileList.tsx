import React, { useEffect, useState } from 'react';
import { getFiles, deleteFile } from '../services/api';
import type { VisaFile } from '../services/api';

const FileList: React.FC = () => {
  const [files, setFiles] = useState<Record<string, VisaFile[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const grouped = await getFiles();
      setFiles(grouped);
    } catch (e) {
      setError('Failed to fetch files.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteFile(id);
      fetchFiles();
    } catch {
      alert('Delete failed.');
    }
  };

  if (loading) return <div>Loading files...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-8">
      {Object.entries(files).map(([type, files]) => (
        <div key={type}>
          <h3 className="text-lg font-bold mb-2 capitalize">{type}</h3>
          {files.length === 0 ? (
            <div className="text-gray-400">No files in this category.</div>
          ) : (
            <ul className="space-y-2">
              {files.map(file => (
                <li key={file.id} className="flex items-center gap-4 bg-white rounded shadow p-3">
                  <span className="flex-1 truncate">{file.original_name} <span className="text-xs text-gray-400">({file.type})</span></span>
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileList; 