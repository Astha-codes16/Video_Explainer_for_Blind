import React from 'react';
import { Play, Clock, AlertCircle, Loader2, CheckCircle2, ChevronRight, Film } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// 1. Accept 'videos' as a prop
const VideoList = ({ videos }) => {
  const navigate = useNavigate();

  // 2. Handle Empty State (No videos in library)
  if (!videos || videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-[#18181b] border border-dashed border-gray-800 rounded-xl text-center">
        <div className="bg-gray-800 p-4 rounded-full mb-4">
          <Film size={32} className="text-gray-500" />
        </div>
        <h3 className="text-gray-300 font-medium text-lg">No videos generated yet</h3>
        <p className="text-gray-500 text-sm mt-1 max-w-xs">
          Upload a video above to start generating your first accessibility track.
        </p>
      </div>
    );
  }

  // 3. Status Logic (Same as before)
  const handleVideoClick = (video) => {
    if (video.status === 'processing') {
      alert("⚠️ This video is still processing. Please wait a moment.");
      return;
    }
    if (video.status === 'failed') {
      alert("❌ This video failed to upload. Please try uploading it again.");
      return;
    }
    alert(`▶️ Now Playing: ${video.title}`);
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'processing':
        return (
          <div className="flex items-center gap-1.5 text-yellow-400 text-xs font-bold bg-yellow-400/10 px-2 py-1 rounded-full border border-yellow-400/20">
            <Loader2 size={12} className="animate-spin" />
            <span>PROCESSING</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center gap-1.5 text-red-400 text-xs font-bold bg-red-400/10 px-2 py-1 rounded-full border border-red-400/20">
            <AlertCircle size={12} />
            <span>FAILED</span>
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
            <CheckCircle2 size={12} />
            <span>READY</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* 4. Map through the REAL 'videos' prop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div 
            key={video.id} 
            onClick={() => handleVideoClick(video)}
            className={`group relative bg-[#18181b] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer
            ${video.status === 'processing' ? 'opacity-80' : ''}
            ${video.status === 'failed' ? 'border-red-900/30' : ''}`}
          >
            {/* Thumbnail */}
            <div className="aspect-video relative overflow-hidden bg-gray-900">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className={`w-full h-full object-cover transition-transform duration-500 ${video.status === 'completed' ? 'group-hover:scale-105' : ''}`}
              />
              
              {video.status === 'completed' && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity duration-300">
                  <div className="bg-teal-500/90 p-3 rounded-full text-white backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform">
                    <Play size={24} fill="white" />
                  </div>
                </div>
              )}

              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                {video.duration}
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-medium text-sm line-clamp-1 pr-2" title={video.title}>
                  {video.title}
                </h3>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                {renderStatus(video.status)}
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  <Clock size={10} /> {video.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* "See More" Link */}
      <div className="flex justify-end mt-8">
        <Link 
          to="/library" 
          className="flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors text-sm font-medium group"
        >
          View Full Library 
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default VideoList;