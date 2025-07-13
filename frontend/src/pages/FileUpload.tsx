import React, { useState, useEffect } from 'react';
import { uploadFile } from '../services/api';
import toast from 'react-hot-toast';

const categoryOptions = [
  { value: 'forms', label: 'Forms' },
  { value: 'photos', label: 'Photos' },
  { value: 'passport', label: 'Passport' },
];

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>('forms');
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toast.error('File size must be less than 4MB');
      return;
    }
    setLoading(true);
    try {
      const response = await uploadFile(file, category);
      toast.success(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className={`bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center transition-all duration-700 ease-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ willChange: 'transform, opacity' }}
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Upload Visa Document</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className="block w-full mb-4 p-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
        >
          {categoryOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <button
          onClick={handleUpload}
          className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200 mb-2"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
};

export default Upload;
