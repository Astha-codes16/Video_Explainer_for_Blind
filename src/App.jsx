import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadPage from "./pages/UploadPage";
import GenerationPage from "./pages/GenerationPage";
import LibraryPage from "./pages/LibraryPage";
import useVideos from "./hooks/useVideos";
import Navbar from "./components/Navbar";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import Trial from "./pages/Trial";

export default function App() {
  const videos = useVideos();

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/library" element={<LibraryPage videos={videos} />} />
          <Route path="/generating" element={<GenerationPage />} />
        </Route>

        <Route>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/trial" element={<Trial />} />
        </Route>
      </Routes>
    </div>
  );
}
