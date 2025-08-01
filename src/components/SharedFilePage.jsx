import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SharedFilePage() {
  const { token } = useParams();
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const res = await fetch(`https://securedocs-backend.onrender.com/verify-share/${token}`);
        const data = await res.json();

        if (res.ok) {
          setFileInfo(data);
        } else {
          setError(data.error || 'Invalid or expired link');
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong');
      }
    };

    fetchFile();
  }, [token]);

  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📄 Shared File</h2>
      {fileInfo ? (
        <div className="bg-white shadow p-4 rounded-lg">
          <p className="font-semibold">File: {fileInfo.fileName}</p>
          <a
            href={fileInfo.downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Download
          </a>
        </div>
      ) : (
        <p>Loading file details...</p>
      )}
    </div>
  );
}

export default SharedFilePage;
