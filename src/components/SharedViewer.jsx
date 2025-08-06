import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../config/baseURL';

const SharedViewer = () => {
  const { token } = useParams(); // 🔐 Get token from URL
  const [fileInfo, setFileInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSharedFile = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/shared/${token}`
          , {          responseType: 'blob', // 📦 We expect a file blob
        });

        const disposition = res.headers['content-disposition'];
        const fileNameMatch = disposition && disposition.match(/filename="(.+)"/);
        const fileName = fileNameMatch ? fileNameMatch[1] : 'shared_file';

        const url = window.URL.createObjectURL(new Blob([res.data]));
        setFileInfo({ url, name: fileName });
        setLoading(false);
      } catch (err) {
        console.error('❌ Error fetching shared file:', err);
        setError('Link is invalid or has expired.');
        setLoading(false);
      }
    };

    fetchSharedFile();
  }, [token]);

  if (loading) return <div className="p-8 text-center text-gray-600">Loading shared file...</div>;
  if (error) return <div className="p-8 text-red-600 text-center">{error}</div>;

  return (
    <div className="p-8 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">📎 Secure Shared File</h2>
      <p className="mb-2">You’ve been granted temporary access to a file.</p>
      <a
        href={fileInfo.url}
        download={fileInfo.name}
        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ⬇️ Download {fileInfo.name}
      </a>
    </div>
  );
};

export default SharedViewer;
