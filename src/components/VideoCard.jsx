import React from 'react';

const VideoCard = ({ video }) => {
  // 1. YouTube ID nikalne ka helper
  const getYoutubeThumbnail = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg` 
      : null;
  };

  // 2. Duration format karne ka helper (seconds to 00:00)
  const formatDuration = (duration) => {
    if (!duration) return "";
    if (typeof duration === 'string' && duration.includes(':')) return duration;
    
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Final Thumbnail Source
  const thumbSrc = video.thumbnail || getYoutubeThumbnail(video.videoUrl) || "https://via.placeholder.com/320x180?text=No+Preview";

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Ready': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      case 'Processing': return 'bg-teal-500/20 text-teal-400 border border-teal-500/30';
      case 'Error': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors group cursor-pointer">
      <div className="relative aspect-video">
        <img 
          src={thumbSrc} 
          alt={video.title} 
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
        />
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {formatDuration(video.duration)}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-white font-medium text-lg truncate mb-1">
          {video.title || (video.videoUrl ? "Remote Video" : "Untitled")}
        </h3>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${getStatusStyles(video.status)}`}>
              {video.status === 'Processing' && (
                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              )}
              {video.status || 'Unknown'}
            </span>
          </div>
          <span className="text-gray-400 text-sm">{video.size || formatDuration(video.duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;