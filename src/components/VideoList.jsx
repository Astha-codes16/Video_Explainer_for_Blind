import React from 'react';
import { 
  Play, 
  Clock, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  Film, 
  Link as LinkIcon, 
  FileVideo 
} from 'lucide-react';

const VideoList = ({ videos, onVideoClick }) => {
  
  // --- 1. EMPTY STATE ---
  if (!videos || videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-[#18181b] border border-dashed border-gray-800 rounded-xl text-center">
        <div className="bg-gray-800 p-4 rounded-full mb-4">
          <Film size={32} className="text-gray-500" />
        </div>
        <h3 className="text-gray-300 font-medium text-lg">No history yet</h3>
        <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
          Once you upload a video or paste a link, it will appear here.
        </p>
      </div>
    );
  }

  // --- 2. HANDLERS ---
  const handleCardClick = (video) => {
    if (onVideoClick) {
        onVideoClick(video);
        return;
    }
    if (video.status?.toLowerCase() === 'processing') {
      alert("⚠️ This video is still processing...");
    }
  };

  const renderStatus = (status) => {
    const s = status?.toLowerCase();
    if (s === 'processing') {
        return (
          <div className="flex items-center gap-1.5 text-yellow-400 text-[10px] font-bold bg-yellow-400/10 px-2 py-1 rounded-full border border-yellow-400/20">
            <Loader2 size={10} className="animate-spin" />
            <span>PROCESSING</span>
          </div>
        );
    }
    if (s === 'failed' || s === 'error') {
        return (
          <div className="flex items-center gap-1.5 text-red-400 text-[10px] font-bold bg-red-400/10 px-2 py-1 rounded-full border border-red-400/20">
            <AlertCircle size={10} />
            <span>FAILED</span>
          </div>
        );
    }
    return (
      <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
        <CheckCircle2 size={10} />
        <span>READY</span>
      </div>
    );
  };

  // --- 3. THE VIDEO GRID ---
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => {
        // Determine if it's a Link or a File based on backend data
        const isExternalLink = !!video.videoUrl;

        return (
          <div 
            key={video.id} 
            onClick={() => handleCardClick(video)}
            className={`group relative bg-[#18181b] border border-gray-800 rounded-xl overflow-hidden hover:border-teal-500/50 transition-all duration-300 shadow-lg hover:shadow-teal-500/5 cursor-pointer
            ${video.status === 'processing' ? 'opacity-90' : ''}`}
          >
            {/* Thumbnail Section */}
            <div className="aspect-video relative overflow-hidden bg-gray-900">
              <img 
                src={video.thumbnail || "https://images.unsplash.com/photo-1616165415772-7494284499f1?q=80&w=500&auto=format&fit=crop"} 
                alt={video.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Source Type Indicator (Link vs File) */}
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md p-1.5 rounded-lg border border-white/10 text-white z-10">
                {isExternalLink ? <LinkIcon size={14} className="text-teal-400" /> : <FileVideo size={14} className="text-blue-400" />}
              </div>

              {/* Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity duration-300">
                <div className="bg-teal-500 p-3 rounded-full text-white transform scale-75 group-hover:scale-100 transition-transform shadow-xl">
                  <Play size={20} fill="currentColor" />
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
              <h3 className="text-white font-semibold text-sm line-clamp-1 mb-1" title={video.title || video.videoUrl}>
                {video.title || (isExternalLink ? video.videoUrl : "Untitled Video")}
              </h3>
              
              <p className="text-gray-500 text-[11px] mb-4 flex items-center gap-1">
                {isExternalLink ? "External URL" : "Local File"}
              </p>

              <div className="flex items-center justify-between border-t border-gray-800 pt-3">
                {renderStatus(video.status)}
                {video.date && (
                    <span className="text-gray-500 text-[10px] flex items-center gap-1 uppercase tracking-wider">
                      <Clock size={10} /> {video.date}
                    </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoList;