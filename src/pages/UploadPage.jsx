import { useState } from "react";
import UploadSection from "../components/UploadSection";
import OptionsSection from "../components/OptionsSection";
import VideoList from "../components/VideoList";
import { Link, useNavigate } from "react-router-dom";
import useVideos from "../hooks/useVideos";
import useUpload from "../hooks/useUpload";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const videos = useVideos();
  const navigate = useNavigate();
  const submitJob = useUpload(navigate);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <UploadSection onFileSelect={setFile} selectedFile={file} />
        <OptionsSection
          fileToUpload={file}
          onSubmit={(options) => submitJob(file, options)}
        />
      </div>

      <section className="pt-10 border-t border-gray-800 space-y-6">
        <h2 className="text-2xl font-bold">Your Recent Generations</h2>
        <VideoList videos={videos.slice(0, 3)} />

        {videos.length > 0 && (
          <div className="text-center">
            <Link to="/library" className="text-teal-400">
              View all in Library →
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
