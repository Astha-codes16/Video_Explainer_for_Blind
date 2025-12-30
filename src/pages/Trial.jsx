import React, { useState } from 'react';

function Trial() {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file!');

    setLoading(true);
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await fetch('http://localhost:3000/file/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Upload failed');

      setVideoUrl(data.url);
      alert('Upload Successful!');

    } catch (error) {
      console.error(error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Upload Video (File Only)</h2>
      
      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <input 
          type="file" 
          accept="video/*" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
        
        <button type="submit" disabled={loading} style={{ padding: '10px', cursor: 'pointer' }}>
          {loading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>

      {/* Show Video if uploaded */}
      {videoUrl && (
        <div style={{ marginTop: '30px' }}>
          <h3>Play Video:</h3>
          <video width="100%" controls src={videoUrl}></video>
          <p style={{fontSize: '12px', wordBreak: 'break-all'}}>{videoUrl}</p>
        </div>
      )}
    </div>
  );
}

export default Trial;