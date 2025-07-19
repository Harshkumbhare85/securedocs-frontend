import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SharedFileViewer = () => {
  const { token } = useParams();
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSharedFile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/shared/${token}`, {
        responseType: 'blob',
      });

      const contentDisposition = res.headers['content-disposition'];
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const fileName = filenameMatch ? filenameMatch[1] : 'downloaded_file';

      const blob = new Blob([res.data]);
      setFileInfo({ blob, name: fileName });
      setLoading(false);
    } catch (err) {
      console.error('❌ Shared file fetch error:', err);
      setError(err?.response?.data?.error || 'Invalid or expired link');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const url = window.URL.createObjectURL(fileInfo.blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileInfo.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchSharedFile();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow p-6 rounded max-w-md w-full text-center">
        {loading ? (
          <p>Loading shared file...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">You’ve received a file</h2>
            <p className="mb-2">File name: <strong>{fileInfo.name}</strong></p>
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download File
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SharedFileViewer;
