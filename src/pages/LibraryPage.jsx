import React, { useState } from 'react';
import VideoList from '../components/VideoList';

const LibraryPage = ({ videos = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // --- Filter Logic ---
  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title
      ? video.title.toLowerCase().includes(searchQuery.toLowerCase())
      : false;

    const currentStatus = video.status ? video.status.toLowerCase() : '';
    let matchesStatus = true;

    if (statusFilter === 'Ready') matchesStatus = currentStatus === 'ready' || currentStatus === 'completed';
    if (statusFilter === 'Processing') matchesStatus = currentStatus === 'processing';
    if (statusFilter === 'Error') matchesStatus = currentStatus === 'error' || currentStatus === 'failed';

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-[#09090b] min-h-screen text-white p-6 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - NOW BIGGER AND BOLDER */}
        <div className="mb-10 border-b border-gray-800 pb-8">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-white">
            My Accessible Videos
          </h1>
          <p className="text-gray-400 text-lg">
            Manage and view all your processed video content.
          </p>
        </div>

        {/* Controls: Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search by title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18181b] border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-600 transition-all"
            />
          </div>

          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-[#18181b] border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Ready">Ready</option>
            <option value="Processing">Processing</option>
            <option value="Error">Error</option>
          </select>
        </div>

        {/* Video Grid */}
        <VideoList videos={filteredVideos} />
      </div>
    </div>
  );
};

export default LibraryPage;