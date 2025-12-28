import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import UploadSection from "./components/UploadSection";
import OptionsSection from "./components/OptionsSection";
import VideoList from "./components/VideoList";
import LibraryPage from './pages/LibraryPage'; 

const HomePage = () => (
  <div className="flex items-center justify-center h-[60vh] text-white">
    <h1 className="text-4xl font-bold text-gray-500">Home Page</h1>
  </div>
);

const FriendGenerationPage = () => (
  <div className="flex items-center justify-center h-[60vh] text-white">
    <h1 className="text-4xl font-bold text-teal-400">Processing Page (Friend's Work)</h1>
    <p className="mt-4 text-gray-400">Your video is being transcribed...</p>
  </div>
);

function App() {
  const [sharedFile, setSharedFile] = useState(null);
  const [allVideos, setAllVideos] = useState([]); 
  const navigate = useNavigate();

  // --- 1. REAL PRODUCTION DATA FETCHING ---
  // This runs immediately when the app loads, and then every 5 seconds.
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Replace 'http://localhost:4000' with your friend's actual backend URL
        const response = await fetch('http://localhost:4000/api/videos');
        
        if (response.ok) {
          const data = await response.json();
          // We strictly set the state to whatever the backend tells us.
          // If backend says "failed", UI shows "failed".
          setAllVideos(data);
        } else {
            console.error("Failed to fetch videos");
        }
      } catch (error) {
        console.log("Backend not connected yet (Waiting...)");
      }
    };

    // Initial Fetch
    fetchVideos();

    // Poll every 5 seconds to keep status accurate (Real-time feel)
    const interval = setInterval(fetchVideos, 5000);

    // Cleanup when app closes
    return () => clearInterval(interval);
  }, []);

  // --- 2. REAL UPLOAD FUNCTION ---
  const handleJobSubmission = async (optionsData) => {
    if (!sharedFile) {
      alert("Please select a video file first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('video', sharedFile);
      formData.append('language', optionsData.language);
      formData.append('skip_silence', optionsData.skipSilence);
      
      console.log("Uploading to backend...");

      // A. Send the File (Uncomment this when backend is ready)
      /* const response = await fetch('http://localhost:4000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed on server');
      }
      */

      // B. Clear the file input
      setSharedFile(null);

      // C. Redirect User to Processing Page
      // Even though we redirect, the 'useEffect' above keeps running in the background,
      // checking the database for the new video.
      navigate('/generating');

    } catch (error) {
      console.error("Upload error:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-teal-500/30">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/upload" element={
          <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
              <div className="h-full">
                <UploadSection onFileSelect={setSharedFile} selectedFile={sharedFile} />
              </div>
              <div className="h-full">
                <OptionsSection 
                  fileToUpload={sharedFile} 
                  onSubmit={handleJobSubmission} 
                />
              </div>
            </div>

            {/* --- RECENT VIDEOS SECTION --- */}
            <section className="space-y-6 pt-10 border-t border-gray-800">
              
              <div className="flex items-end justify-between px-1">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    Your Recent Generations
                  </h2>
                  {/* Updated Text per your request */}
                  <p className="text-gray-500 text-sm mt-1">
                    {allVideos.length > 0 
                      ? "Check the status of your videos while you wait."
                      : "Upload a video to see it appear here while you wait."}
                  </p>
                </div>

                {/* 'See Full Library' only appears if you have more than 3 videos */}
                {allVideos.length > 3 && (
                  <Link 
                    to="/library" 
                    className="text-teal-400 hover:text-teal-300 text-sm font-semibold flex items-center gap-1 transition-colors pb-1"
                  >
                    See Full Library →
                  </Link>
                )}
              </div>

              {/* Strict Limit: Only show 3 videos here */}
              <VideoList videos={allVideos.slice(0, 3)} />

              {/* Small bottom link if list is short */}
              {allVideos.length > 0 && allVideos.length <= 3 && (
                  <div className="flex justify-center mt-6">
                    <Link 
                      to="/library" 
                      className="text-gray-400 hover:text-white text-sm border-b border-gray-700 hover:border-gray-400 transition-all pb-0.5"
                    >
                      View all in Library
                    </Link>
                  </div>
              )}

            </section>
          </main>
        } />

        <Route path="/generating" element={<FriendGenerationPage />} />
        
        {/* Pass Real Data to Library */}
        <Route path="/library" element={<LibraryPage videos={allVideos} />} />

      </Routes>
    </div>
  );
}

export default App;