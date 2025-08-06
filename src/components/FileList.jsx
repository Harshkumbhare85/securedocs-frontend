import React from 'react';
import axios from 'axios';
import baseUrl from '../../config/baseURL';

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const FileList = ({ files, token, onFileChange }) => {
  const handleDownload = async (id, originalName) => {
    try {
      const res = await axios.get(`${baseUrl}/api/files/${id}/download`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', originalName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('❌ Download failed:', err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/files/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onFileChange(); // Refresh the list
    } catch (err) {
      console.error('❌ Delete failed:', err.response?.data || err.message);
    }
  };

  const handleShare = async (id) => {
    const email = prompt("📧 Enter recipient's email to share:");
    if (!email) return;

    try {
      await axios.post(`${baseUrl}/api/share/${id}`, { email }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('✅ Share link generated and sent (mock)');
    } catch (err) {
      console.error('❌ Share failed:', err.response?.data || err.message);
      alert('Error sharing file.');
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Your Files</h2>
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {files.map((file) => (
            <li key={file._id} className="flex justify-between items-center bg-gray-50 p-3 border rounded">
              <div>
                <p className="font-medium">{file.originalName}</p>
                <p className="text-sm text-gray-500">
                  📅 Uploaded: {new Date(file.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  📦 Size: {(file.size / 1024).toFixed(2)} KB
                </p>
                <p className="text-sm text-gray-500">
                  🧾 Type: {file.mimeType}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(file._id, file.originalName)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Download
                </button>
                <button
                  onClick={() => handleDelete(file._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleShare(file._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Share
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
