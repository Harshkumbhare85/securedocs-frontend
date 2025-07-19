import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SharedDocument() {
  const { token } = useParams();
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const res = await axios.get(`http://192.168.1.5:5000/api/verify-share/${token}`);
        setFileData(res.data);
      } catch (err) {
        setError('⚠️ Invalid or expired link.');
      }
    };

    fetchFile();
  }, [token]);

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-10 text-center">
      {fileData ? (
        <a
          href={fileData.downloadUrl}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          download
        >
          📥 Download {fileData.fileName}
        </a>
      ) : (
        <p>Verifying your link...</p>
      )}
    </div>
  );
}

export default SharedDocument;
