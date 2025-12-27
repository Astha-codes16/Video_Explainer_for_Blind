import React, { useState } from 'react';
// REMOVED: import { useNavigate } ... We don't need it here!

// 1. Accept 'onSubmit' as a prop
const OptionsSection = ({ fileToUpload, onSubmit }) => {
  
  // State for Prompt instructions
  const [language, setLanguage] = useState('English (US)');
  const [detailLevel, setDetailLevel] = useState('Detailed (Full Description)');
  const [skipSongs, setSkipSongs] = useState(false);
  const [skipDialogues, setSkipDialogues] = useState(false);

  const handleGenerate = () => {
    // A. Validation: Ensure a video is selected
    if (!fileToUpload) {
      alert("Please upload a video first!");
      return;
    }

    // B. Package the Options
    const promptData = {
      language: language,
      detailLevel: detailLevel,
      skipSongs: skipSongs,
      skipDialogues: skipDialogues
    };

    // C. SEND DATA UP: Hand the package to App.jsx
    console.log("Sending options to App.jsx...", promptData);
    onSubmit(promptData); 
  };

  return (
    <div className="bg-[#18181b] p-8 rounded-2xl border border-gray-800 h-full flex flex-col hover:border-gray-600 transition-colors duration-300 shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">Options</h2>

      {/* Language Section */}
      <div className="mb-6 group">
        <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider group-hover:text-teal-400 transition-colors">Language</label>
        <div className="relative">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 appearance-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all duration-300 cursor-pointer hover:bg-gray-750"
          >
            <option>English (US)</option>
            <option>English (UK)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
        </div>
      </div>

      {/* Narrative Detail Section */}
      <div className="mb-8 group">
        <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider group-hover:text-teal-400 transition-colors">Narrative Detail</label>
        <div className="relative">
          <select 
            value={detailLevel}
            onChange={(e) => setDetailLevel(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 appearance-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all duration-300 cursor-pointer hover:bg-gray-750"
          >
            <option>Minimal (Key Actions Only)</option>
            <option>Detailed (Full Description)</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
        </div>
      </div>

      {/* Toggles Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        {/* Toggle 1 */}
        <div className="flex items-center justify-between w-full sm:w-1/2 bg-gray-800/50 p-3 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors duration-300">
          <span className="text-sm text-gray-300 font-medium">Skip Songs</span>
          <button 
            onClick={() => setSkipSongs(!skipSongs)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500/40 ${skipSongs ? 'bg-teal-500' : 'bg-gray-600'}`}
          >
            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${skipSongs ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Toggle 2 */}
        <div className="flex items-center justify-between w-full sm:w-1/2 bg-gray-800/50 p-3 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors duration-300">
          <span className="text-sm text-gray-300 font-medium">Skip Dialogues</span>
          <button 
            onClick={() => setSkipDialogues(!skipDialogues)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500/40 ${skipDialogues ? 'bg-teal-500' : 'bg-gray-600'}`}
          >
            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${skipDialogues ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* Generate Button */}
      <button 
        onClick={handleGenerate}
        disabled={!fileToUpload} 
        className={`mt-auto w-full font-bold py-4 rounded-lg text-lg transition-all duration-200 shadow-lg shadow-teal-900/20 active:scale-95 transform hover:-translate-y-1
          ${fileToUpload 
            ? 'bg-teal-500 hover:bg-teal-400 text-white' 
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
      >
        {fileToUpload ? "Generate" : "Upload Video First"}
      </button>
    </div>
  );
};

export default OptionsSection;