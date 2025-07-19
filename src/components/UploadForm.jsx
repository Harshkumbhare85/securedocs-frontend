import React from 'react';
import axios from 'axios';

const UploadForm = ({ file, setFile, token, onUploadSuccess }) => {
  const handleUpload = async () => {
    console.log("🔐 Upload Token being sent:", token);

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setFile(null);
      document.getElementById('fileInput').value = '';
      onUploadSuccess(); // Refresh the file list
    } catch (err) {
      console.error('❌ Upload failed:', err);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Upload a File</h3>
      <input
        type="file"
        id="fileInput"
        onChange={(e) => setFile(e.target.files[0])}
        className="border w-full px-3 py-2 mb-2"
      />
      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Upload File
      </button>
    </div>
  );
};

export default UploadForm;
