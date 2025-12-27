import React, { useState, useRef } from 'react';
import { AlertCircle, UploadCloud, X, Trash2 } from 'lucide-react';

// Receive props from App.jsx
const UploadSection = ({ onFileSelect, selectedFile }) => {
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Send file UP to App.jsx
      onFileSelect(file);
    }
  };

  const removeFile = () => {
    // Tell App.jsx to clear the file
    onFileSelect(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  // ... (Keep handleLinkChange and formatSize exactly the same as before) ...
  const handleLinkChange = (e) => {
    const value = e.target.value;
    setLink(value);
    if (value && !/^(http|https):\/\/[^ "]+$/.test(value)) {
      setError('Format is wrong. This is not a valid link.');
    } else {
      setError('');
    }
  };

  const formatSize = (bytes) => {
    if(bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col h-full animate-fade-in-up">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
        Make Any Video <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Accessible</span>
      </h1>
      
      <div 
        className={`flex-1 border-2 border-dashed transition-all duration-300 ease-in-out group relative overflow-hidden
        ${dragActive ? 'border-teal-500 bg-teal-500/10' : 'border-gray-600 bg-[#121215] hover:border-teal-500/50 hover:bg-[#1a1a20]'} 
        rounded-2xl p-8 flex flex-col justify-center items-center text-center`}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // Send file UP to App.jsx
            onFileSelect(e.dataTransfer.files[0]);
          }
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="video/*"
        />

        {/* Use the prop 'selectedFile' instead of local state */}
        {selectedFile ? (
          <div className="w-full max-w-md bg-gray-800 rounded-xl p-8 border border-teal-500/30 shadow-2xl relative">
            <button 
              onClick={removeFile}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors"
              title="Remove file"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center justify-center">
              <h3 className="text-white font-bold text-xl mb-2 break-all line-clamp-2">
                {selectedFile.name}
              </h3>
              <p className="text-gray-400 text-sm mb-8">
                {formatSize(selectedFile.size)}
              </p>

              <div className="flex gap-3 w-full">
                 <button 
                   onClick={removeFile}
                   className="flex-1 flex items-center justify-center gap-2 border border-gray-600 hover:bg-gray-700 text-gray-300 py-3 rounded-lg transition-colors text-sm font-medium"
                 >
                   <Trash2 size={18} /> Change File
                 </button>
              </div>
            </div>
          </div>
        ) : (
          /* Keep the exact same "No File" view you had before */
          <>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-5 pointer-events-none transition-opacity duration-500">
               <UploadCloud size={200} />
            </div>

            <p className="text-gray-400 text-lg mb-8 max-w-sm z-10">
              Drop files here. We'll generate your accessibility track.
            </p>

            <button 
              onClick={handleBrowseClick}
              className="w-full max-w-md bg-teal-500 hover:bg-teal-400 active:scale-95 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 mb-5 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 z-10"
            >
              Browse Files
            </button>

            <span className="text-gray-500 text-sm font-medium mb-5 uppercase tracking-widest">OR</span>

            <div className="w-full max-w-md z-10">
              <input 
                  type="text"
                  value={link}
                  onChange={handleLinkChange}
                  placeholder="Paste Video Link"
                  className={`w-full bg-gray-800/50 text-center text-gray-300 py-3.5 px-6 rounded-lg border transition-all duration-300 placeholder-gray-500 focus:bg-gray-800
                    ${error ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none'}`}
              />
              
              {error && (
                <div className="text-red-400 text-sm mt-3 flex items-center justify-center gap-2 animate-bounce-short">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default UploadSection;