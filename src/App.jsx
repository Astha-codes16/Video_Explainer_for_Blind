import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import Navbar from "./components/Navbar";
import UploadSection from "./components/UploadSection";
import OptionsSection from "./components/OptionsSection";
import VideoList from "./components/VideoList";

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
  const navigate = useNavigate(); // Hook to move pages automatically

  // --- 1. AUTOMATIC DATA FETCHING (Keep existing logic) ---
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/videos');
        if (response.ok) {
          const data = await response.json();
          setAllVideos(data);
        }
      } catch (error) {
        console.log("Waiting for backend...");
      }
    };
    fetchVideos();
    const interval = setInterval(fetchVideos, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- 2. THE MAIN UPLOAD FUNCTION ---
  // This sends the Video + The Prompt (Options) to the backend
  const handleJobSubmission = async (optionsData) => {
    if (!sharedFile) {
      alert("Please select a video file first!");
      return;
    }

    try {
      // A. Create the bundle to send
      const formData = new FormData();
      formData.append('video', sharedFile); // The Video File
      formData.append('language', optionsData.language); // Prompt Option 1
      formData.append('skip_silence', optionsData.skipSilence); // Prompt Option 2
      // Add any other options here...

      console.log("Sending data to backend...");

      // B. Send to Backend (Simulated for now)
      // In real life, uncomment this:
      /* const response = await fetch('http://localhost:4000/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      */
     setSharedFile(null);
      // C. If successful, REDIRECT to the Processing Page
      // This happens instantly like a big website
      navigate('/generating');

    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong uploading the video.");
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
                {/* Pass the submission function DOWN to OptionsSection 
                   so the "Generate" button triggers it.
                */}
                <OptionsSection 
                  fileToUpload={sharedFile} 
                  onSubmit={handleJobSubmission} 
                />
              </div>
            </div>

            {/* Recent Videos Section */}
            <section className="space-y-8 animate-fade-in delay-200">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  {allVideos.length > 0 ? "Recent Uploads" : "No recent videos found"}
                </h2>
                {allVideos.length > 3 && (
                  <Link to="/library" className="text-teal-400 hover:text-teal-300 text-sm font-semibold transition-colors">
                    See More →
                  </Link>
                )}
              </div>
              <VideoList videos={allVideos.slice(0, 3)} />
            </section>
          </main>
        } />

        <Route path="/generating" element={<FriendGenerationPage />} />
        
        <Route path="/library" element={
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-8">Your Library</h1>
            <VideoList videos={allVideos} />
          </div>
        } />

      </Routes>
    </div>
  );
}

export default App;          