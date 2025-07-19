import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UploadForm from './UploadForm';
import FileList from './FileList';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // ✅ Check login token
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchFiles();
    }
    // eslint-disable-next-line
  }, []);

  // ✅ Fetch user files
  const fetchFiles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/files', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(res.data);
    } catch (err) {
      console.error('❌ Fetch files error:', err);
    }
  };

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">📁 SecureDocs Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Upload Form */}
        <UploadForm file={file} setFile={setFile} token={token} onUploadSuccess={fetchFiles} />

        <hr className="my-6" />

        {/* File List */}
        <FileList files={files} token={token} onFileChange={fetchFiles} />
      </div>
    </div>
  );
};

export default Dashboard;
