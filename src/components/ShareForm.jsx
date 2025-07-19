import React, { useState } from 'react';
import axios from 'axios';

const ShareForm = ({ fileId }) => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [status, setStatus] = useState('');
  const [shareLink, setShareLink] = useState(''); // 👈 New state for the link

  const handleShare = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        `http://localhost:5000/api/share/${fileId}`,
        { email: recipientEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus('✅ File shared successfully!');
      setShareLink(`http://localhost:3000/shared/${res.data.token}`);
    } catch (err) {
      console.error(err);
      setStatus('❌ Share failed');
    }
  };

  return (
    <form onSubmit={handleShare} className="mt-4">
      <label className="block mb-1 text-sm font-medium">Share with Email:</label>
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          className="border px-2 py-1 rounded w-full"
          placeholder="recipient@example.com"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Share
        </button>
      </div>

      {status && <p className="text-sm mt-2">{status}</p>}

      {shareLink && (
        <div className="mt-2 text-sm text-blue-600">
          🔗 Access Link:{" "}
          <a
            href={shareLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {shareLink}
          </a>
        </div>
      )}
    </form>
  );
};

export default ShareForm;
