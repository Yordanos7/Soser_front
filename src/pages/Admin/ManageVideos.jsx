
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FilmIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
  PlayIcon,
  TagIcon,
  CalendarDaysIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const ManageVideos = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Sosser Impact Documentary 2023',
      category: 'Documentary',
      duration: '12:45',
      views: '15.2K',
      uploadDate: '2024-01-15',
      description: 'Comprehensive documentary showcasing Sosser\'s impact on Ethiopian communities',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/videos/documentary-thumb.jpg',
      featured: true,
      status: 'published',
      author: 'Sosser Media Team'
    },
    {
      id: 2,
      title: 'How to Use Mobile Banking App',
      category: 'Tutorial',
      duration: '8:30',
      views: '23.7K',
      uploadDate: '2023-12-20',
      description: 'Step-by-step guide on using Sosser\'s mobile banking application',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/videos/mobile-banking-thumb.jpg',
      featured: true,
      status: 'published',
      author: 'Digital Banking Team'
    },
    {
      id: 3,
      title: 'Success Story: Almaz\'s Textile Business',
      category: 'Success Story',
      duration: '6:15',
      views: '8.9K',
      uploadDate: '2023-11-30',
      description: 'Meet Almaz Tadesse who transformed her textile shop into a thriving business',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/videos/almaz-story-thumb.jpg',
      featured: false,
      status: 'published',
      author: 'Success Stories Team'
    },
    {
      id: 4,
      title: 'Financial Literacy Workshop Highlights',
      category: 'Education',
      duration: '10:22',
      views: '12.1K',
      uploadDate: '2023-11-15',
      description: 'Highlights from recent financial literacy workshop in Addis Ababa',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/videos/workshop-thumb.jpg',
      featured: false,
      status: 'draft',
      author: 'Education Team'
    }
  ]);

  const [selectedVideos, setSelectedVideos] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [newVideo, setNewVideo] = useState({
    title: '',
    category: 'Tutorial',
    duration: '',
    description: '',
    videoUrl: '',
    author: '',
    featured: false
  });

  const categories = [
    'All', 'Documentary', 'Tutorial', 'Success Story', 'Education', 'Event', 'Program'
  ];

  const filteredVideos = activeCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  const handleSelectVideo = (videoId) => {
    setSelectedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleSelectAll = () => {
    if (selectedVideos.length === filteredVideos.length) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(filteredVideos.map(video => video.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedVideos.length === 0) return;
    
    if (confirm(`Delete ${selectedVideos.length} selected video(s)?`)) {
      setVideos(prev => prev.filter(video => !selectedVideos.includes(video.id)));
      setSelectedVideos([]);
    }
  };

  const handleDeleteVideo = (videoId) => {
    if (confirm('Delete this video?')) {
      setVideos(prev => prev.filter(video => video.id !== videoId));
      setSelectedVideos(prev => prev.filter(id => id !== videoId));
    }
  };

  const handleEditVideo = (video) => {
    setEditingVideo(video);
    setNewVideo({
      title: video.title,
      category: video.category,
      duration: video.duration,
      description: video.description,
      videoUrl: video.videoUrl,
      author: video.author,
      featured: video.featured
    });
    setShowVideoModal(true);
  };

  const handleSaveVideo = () => {
    if (editingVideo) {
      // Update existing video
      setVideos(prev => prev.map(video => 
        video.id === editingVideo.id 
          ? { 
              ...video, 
              ...newVideo, 
              thumbnail: '/images/videos/placeholder-thumb.jpg'
            }
          : video
      ));
    } else {
      // Add new video
      const newId = Math.max(...videos.map(video => video.id)) + 1;
      setVideos(prev => [...prev, {
        id: newId,
        ...newVideo,
        views: '0',
        uploadDate: new Date().toISOString().split('T')[0],
        thumbnail: '/images/videos/placeholder-thumb.jpg',
        status: 'draft'
      }]);
    }
    
    // Reset form
    setNewVideo({
      title: '',
      category: 'Tutorial',
      duration: '',
      description: '',
      videoUrl: '',
      author: '',
      featured: false
    });
    setEditingVideo(null);
    setShowVideoModal(false);
  };

  const handleToggleFeatured = (videoId) => {
    setVideos(prev => prev.map(video => 
      video.id === videoId 
        ? { ...video, featured: !video.featured }
        : video
    ));
  };

  const handleToggleStatus = (videoId) => {
    setVideos(prev => prev.map(video => 
      video.id === videoId 
        ? { ...video, status: video.status === 'published' ? 'draft' : 'published' }
        : video
    ));
  };

  const formatViews = (views) => {
    return views.replace('K', ',000').replace('M', ',000,000');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Videos</h1>
            <p className="text-gray-600">Upload, organize, and manage video content</p>
          </div>
          <button
            onClick={() => setShowVideoModal(true)}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add New Video
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FilmIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">{videos.length}</h3>
            <p className="text-gray-600">Total Videos</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <EyeIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">
              {Math.round(videos.reduce((total, video) => {
                const views = parseFloat(video.views.replace('K', '')) * (video.views.includes('K') ? 1000 : 1);
                return total + views;
              }, 0) / 1000)}K
            </h3>
            <p className="text-gray-600">Total Views</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <PlayIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">
              {videos.filter(video => video.featured).length}
            </h3>
            <p className="text-gray-600">Featured</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <CalendarDaysIcon className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">
              {videos.filter(video => video.status === 'published').length}
            </h3>
            <p className="text-gray-600">Published</p>
          </div>
        </motion.div>

        {/* Filters and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Bulk Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSelectAll}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {selectedVideos.length === filteredVideos.length ? 'Deselect All' : 'Select All'}
              </button>
              {selectedVideos.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center"
                >
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Delete ({selectedVideos.length})
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Videos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Video Thumbnail */}
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-green-500 flex items-center justify-center">
                  <PlayIcon className="w-16 h-16 text-white" />
                </div>
                
                {/* Duration */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>

                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    video.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {video.status}
                  </span>
                </div>

                {/* Featured Badge */}
                {video.featured && (
                  <div className="absolute top-2 right-2">
                    <span className="text-yellow-500 text-lg">⭐</span>
                  </div>
                )}

                {/* Selection Checkbox */}
                <div className="absolute bottom-2 left-2">
                  <input
                    type="checkbox"
                    checked={selectedVideos.includes(video.id)}
                    onChange={() => handleSelectVideo(video.id)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-sm truncate">{video.title}</h3>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {video.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-xs">
                    <EyeIcon className="w-3 h-3 mr-1" />
                    {video.views}
                  </div>
                </div>

                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {video.description}
                </p>

                <div className="text-xs text-gray-500 mb-4">
                  <p>By: {video.author}</p>
                  <p>Uploaded: {new Date(video.uploadDate).toLocaleDateString()}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditVideo(video)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="Edit"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(video.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleToggleFeatured(video.id)}
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors duration-200 ${
                        video.featured
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
                      }`}
                    >
                      {video.featured ? 'Featured' : 'Feature'}
                    </button>
                    <button
                      onClick={() => handleToggleStatus(video.id)}
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors duration-200 ${
                        video.status === 'published'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                      }`}
                    >
                      {video.status === 'published' ? 'Published' : 'Publish'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add/Edit Video Modal */}
        {showVideoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {editingVideo ? 'Edit Video' : 'Add New Video'}
              </h3>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter video title..."
                  />
                </div>

                {/* Category and Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Category
                    </label>
                    <select
                      value={newVideo.category}
                      onChange={(e) => setNewVideo(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.filter(cat => cat !== 'All').map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={newVideo.duration}
                      onChange={(e) => setNewVideo(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 10:30"
                    />
                  </div>
                </div>

                {/* Video URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Video URL *
                  </label>
                  <input
                    type="url"
                    value={newVideo.videoUrl}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, videoUrl: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newVideo.description}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Video description..."
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Author/Creator
                  </label>
                  <input
                    type="text"
                    value={newVideo.author}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Content creator name..."
                  />
                </div>

                {/* Featured */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newVideo.featured}
                      onChange={(e) => setNewVideo(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-900">Feature this video</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowVideoModal(false);
                    setEditingVideo(null);
                    setNewVideo({
                      title: '',
                      category: 'Tutorial',
                      duration: '',
                      description: '',
                      videoUrl: '',
                      author: '',
                      featured: false
                    });
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveVideo}
                  disabled={!newVideo.title || !newVideo.videoUrl}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {editingVideo ? 'Update Video' : 'Add Video'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageVideos;
