import React, { useEffect, useState } from 'react';
import { getFiles, deleteFile } from '../services/api';
import type { VisaFile as BaseVisaFile } from '../services/api';
import FileCard from '../components/FileCard';

type VisaFile = BaseVisaFile & { preview?: string };

const FileList: React.FC = () => {
  const [groupedFiles, setGroupedFiles] = useState<Record<string, VisaFile[]>>({ passport: [], photos: [], forms: [] });
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const grouped = await getFiles();
        setGroupedFiles(grouped);
        if (Object.values(grouped).every((arr) => arr.length === 0)) {
          setMessage('No files uploaded yet.');
        }
      } catch (error) {
        setGroupedFiles({ passport: [], photos: [], forms: [] });
        setMessage('Error fetching files.');
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const handleDelete = async (fileId: number) => {
    try {
      await deleteFile(fileId);
      setMessage('File deleted successfully.');
      window.location.reload();
    } catch (error) {
      setMessage('Error deleting file.');
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold text-blue-600 mb-8">Uploaded Files</h3>
      {loading ? (
        <p className="text-gray-500">Loading files...</p>
      ) : Object.values(groupedFiles).every((arr) => arr.length === 0) ? (
        <p className="text-gray-400">{message}</p>
      ) : (
        <div className="flex gap-8 flex-wrap">
          {['passport', 'photos', 'forms'].map((category) => (
            <div key={category} className='flex-1'>
              <h4 className="text-lg font-semibold capitalize mb-4 text-gray-700">{category}</h4>
              {groupedFiles[category].length === 0 ? (
                <p className="text-gray-400 mb-4">{message}</p>
              ) : (
                groupedFiles[category].map((file, idx) => (
                  <FileCard
                    key={file.id}
                    fileName={file.original_name}
                    fileType={file.type}
                    preview={file.preview}
                    index={idx}
                    onDelete={() => handleDelete(file.id)}
                  />
                ))
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;
