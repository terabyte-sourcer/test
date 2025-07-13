import axios from 'axios';

export interface VisaFile {
    id: number;
    original_name: string;
    type: string;
    size: number;
    filename: string;
    created_at: string;
    updated_at: string;
}

const BASE_URL = 'http://localhost:8000/api/visa-files';

// Upload file to the backend
export const uploadFile = async (file: File, category: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    try {
        const response = await axios.post(BASE_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.message || 'File uploaded successfully!';
    } catch (error: any) {
        console.error('Upload error details:', error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else if (error.response?.data?.exception) {
            throw new Error(`Server error: ${error.response.data.exception}`);
        } else {
            throw new Error('Error uploading file. Please try again.');
        }
    }
};

// Fetch all uploaded files
export const getFiles = async (): Promise<Record<string, VisaFile[]>> => {
    try {
        const response = await axios.get(BASE_URL);
        if (response.data && typeof response.data === 'object') {
            return response.data;
        } else {
            throw new Error('Data is not in the expected format.');
        }
    } catch (error: any) {
        console.error('Error fetching files:', error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error fetching files.');
        }
    }
};

// Delete a file by ID
export const deleteFile = async (fileId: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${fileId}`);
    } catch (error: any) {
        console.error('Error deleting file:', error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error deleting file.');
        }
    }
};
