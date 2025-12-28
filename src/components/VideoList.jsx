import React from 'react';
import { Play, Clock, AlertCircle, Loader2, CheckCircle2, Film } from 'lucide-react';

const VideoList = ({ videos, onVideoClick }) => {
  
  // --- 1. ACCURATE EMPTY STATE ---
  // This shows if the user has NEVER processed a video before.
  if (!videos || videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-[#18181b] border border-dashed border-gray-800 rounded-xl text-center">
        <div className="bg-gray-800 p-4 rounded-full mb-4">
          <Film size={32} className="text-gray-500" />
        </div>
        <h3 className="text-gray-300 font-medium text-lg">No history yet</h3>
        <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
          Once you upload and process a video, it will appear here in your library.
        </p>
      </div>
    );
  }

  // --- 2. HELPER FUNCTIONS ---
  const handleCardClick = (video) => {
    if (onVideoClick) {
        onVideoClick(video);
        return;
    }
    // Default fallback alerts (useful for testing)
    if (video.status?.toLowerCase() === 'processing') {
      alert("⚠️ This video is still processing...");
    } else {
      console.log(`Navigating to video: ${video.title}`);
    }
  };

  const renderStatus = (status) => {
    const s = status?.toLowerCase();
    
    if (s === 'processing') {
        return (
          <div className="flex items-center gap-1.5 text-yellow-400 text-xs font-bold bg-yellow-400/10 px-2 py-1 rounded-full border border-yellow-400/20">
            <Loader2 size={12} className="animate-spin" />
            <span>PROCESSING</span>
          </div>
        );
    }
    if (s === 'failed' || s === 'error') {
        return (
          <div className="flex items-center gap-1.5 text-red-400 text-xs font-bold bg-red-400/10 px-2 py-1 rounded-full border border-red-400/20">
            <AlertCircle size={12} />
            <span>FAILED</span>
          </div>
        );
    }
    return (
      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
        <CheckCircle2 size={12} />
        <span>READY</span>
      </div>
    );
  };

  // --- 3. THE VIDEO GRID ---
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div 
          key={video.id} 
          onClick={() => handleCardClick(video)}
          className={`group relative bg-[#18181b] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer
          ${video.status === 'processing' ? 'opacity-80' : ''}`}
        >
          {/* Thumbnail */}
          <div className="aspect-video relative overflow-hidden bg-gray-900">
            <img 
              src={video.thumbnail || "https://via.placeholder.com/640x360?text=Processing"} 
              alt={video.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity duration-300">
              <div className="bg-teal-500/90 p-3 rounded-full text-white backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform">
                <Play size={24} fill="white" />
              </div>
            </div>
            {/* Duration Badge */}
            {video.duration && (
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                {video.duration}
                </div>
            )}
          </div>

          {/* Info Section */}
          <div className="p-4">
            <h3 className="text-white font-medium text-sm line-clamp-1 mb-3" title={video.title}>
              {video.title}
            </h3>
            <div className="flex items-center justify-between">
              {renderStatus(video.status)}
              {video.date && (
                  <span className="text-gray-500 text-xs flex items-center gap-1">
                    <Clock size={10} /> {video.date}
                  </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;