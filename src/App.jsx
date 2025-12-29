import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UploadPage from "./pages/UploadPage";
import GenerationPage from "./pages/GenerationPage";
import LibraryPage from "./pages/LibraryPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Trial from "./pages/Trial";

import useVideos from "./hooks/useVideos";
import MainLayout from "./layouts/MainLayout";

function App() {
  const { videos } = useVideos(); // ✅ now defined

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <Routes>
        {/* Main App Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/library" element={<LibraryPage videos={videos} />} />
          <Route path="/generating" element={<GenerationPage />} />
        </Route>

        {/* Auth & Misc */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/trial" element={<Trial />} />
      </Routes>
    </div>
  );
}

export default App;
