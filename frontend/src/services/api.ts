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
export const uploadFile = async (file: File): Promise<VisaFile> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(BASE_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Fetch all uploaded files (grouped by type)
export const getFiles = async (): Promise<Record<string, VisaFile[]>> => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

// Delete a file by ID
export const deleteFile = async (fileId: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${fileId}`);
}; 