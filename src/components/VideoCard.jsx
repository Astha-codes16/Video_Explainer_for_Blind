import React from 'react';

const VideoCard = ({ video }) => {
  // Helper to determine status styling
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Ready':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      case 'Processing':
        return 'bg-teal-500/20 text-teal-400 border border-teal-500/30';
      case 'Error':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors group cursor-pointer">
      {/* Thumbnail Section */}
      <div className="relative aspect-video">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
        />
        {/* Duration Badge (Bottom Right) */}
        {video.duration && (
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                {video.duration}
            </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-white font-medium text-lg truncate mb-1">{video.title}</h3>
        
        {/* Status Row */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${getStatusStyles(video.status)}`}>
              {video.status === 'Processing' && (
                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              )}
              {video.status === 'Processing' ? 'Processing...' : video.status}
            </span>
            
            {/* Show percentage if processing */}
            {video.status === 'Processing' && video.progress && (
                <span className="text-gray-400 text-xs">{video.progress}%</span>
            )}
          </div>

          <span className="text-gray-400 text-sm">{video.size || video.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;