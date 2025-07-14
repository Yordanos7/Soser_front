import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhotoIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const galleryImages = [
    {
      id: 1,
      title: "Grand Opening Ceremony",
      category: "Events",
      date: "2023-12-15",
      description:
        "Official opening of our new Bahir Dar branch with community leaders and members.",
      image: "/1.png",
      featured: true,
    },
    {
      id: 2,
      title: "Financial Literacy Workshop",
      category: "Training",
      date: "2023-11-20",
      description:
        "Community members participating in financial literacy training session.",
      image: "/2.png",
      featured: true,
    },
    {
      id: 3,
      title: "Agricultural Loan Beneficiaries",
      category: "Success Stories",
      date: "2023-10-30",
      description:
        "Farmers showcasing improved crops after receiving agricultural loans.",
      image: "/3.png",
      featured: true,
    },
    {
      id: 4,
      title: "Digital Banking Training",
      category: "Training",
      date: "2023-12-05",
      description:
        "Members learning to use mobile banking services and digital payment systems.",
      image: "/2.png",
      featured: false,
    },
    {
      id: 5,
      title: "Head Office Building",
      category: "Infrastructure",
      date: "2023-09-15",
      description:
        "Modern headquarters building in Addis Ababa with state-of-the-art facilities.",
      image: "/1.png",
      featured: false,
    },
    {
      id: 6,
      title: "Women Entrepreneurs Meeting",
      category: "Events",
      date: "2023-11-08",
      description:
        "Monthly meeting of women entrepreneurs supported by Sosser microfinance.",
      image: "/3.png",
      featured: true,
    },
    {
      id: 7,
      title: "Youth Entrepreneurship Seminar",
      category: "Events",
      date: "2023-10-12",
      description:
        "Young entrepreneurs presenting their business ideas at university seminar.",
      image: "/2.png",
      featured: false,
    },
    {
      id: 8,
      title: "Customer Service Center",
      category: "Infrastructure",
      date: "2023-08-25",
      description:
        "Modern customer service center providing efficient banking services.",
      image: "/1.png",
      featured: false,
    },
    {
      id: 9,
      title: "Community Outreach Program",
      category: "Community",
      date: "2023-12-20",
      description:
        "Sosser team visiting rural communities to promote financial inclusion.",
      image: "/4.png",
      featured: true,
    },
    {
      id: 10,
      title: "Technology Infrastructure",
      category: "Infrastructure",
      date: "2023-09-30",
      description:
        "Modern IT infrastructure supporting digital banking operations.",
      image: "/5.png",
      featured: false,
    },
    {
      id: 11,
      title: "Small Business Success",
      category: "Success Stories",
      date: "2023-11-15",
      description:
        "Local business owner expanding operations with Sosser business loan.",
      image: "/3.png",
      featured: true,
    },
    {
      id: 12,
      title: "Staff Training Session",
      category: "Training",
      date: "2023-10-05",
      description:
        "Sosser staff participating in professional development training.",
      image: "/1.png",
      featured: false,
    },
  ];

  const categories = [
    { name: "All", count: galleryImages.length },
    {
      name: "Events",
      count: galleryImages.filter((img) => img.category === "Events").length,
    },
    {
      name: "Training",
      count: galleryImages.filter((img) => img.category === "Training").length,
    },
    {
      name: "Success Stories",
      count: galleryImages.filter((img) => img.category === "Success Stories")
        .length,
    },
    {
      name: "Infrastructure",
      count: galleryImages.filter((img) => img.category === "Infrastructure")
        .length,
    },
    {
      name: "Community",
      count: galleryImages.filter((img) => img.category === "Community").length,
    },
  ];

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const featuredImages = galleryImages.filter((img) => img.featured);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const prevIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Photo Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore moments that tell the story of Sosser's impact across
            Ethiopian communities. From grand openings to success stories,
            witness our journey in pictures.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <PhotoIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">
              {galleryImages.length}
            </h3>
            <p className="text-gray-600">Total Photos</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <CalendarDaysIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">
              {categories.length - 1}
            </h3>
            <p className="text-gray-600">Categories</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <EyeIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">
              {featuredImages.length}
            </h3>
            <p className="text-gray-600">Featured Photos</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <PhotoIcon className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">2023</h3>
            <p className="text-gray-600">Latest Year</p>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category.name)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category.name
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Featured Images */}
        {activeCategory === "All" && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Featured Photos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredImages.slice(0, 3).map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="relative group cursor-pointer"
                  onClick={() => openModal(image)}
                >
                  <div className="aspect-w-16 aspect-h-12 bg-gray-300 rounded-xl overflow-hidden">
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-xl flex items-center justify-center">
                    <EyeIcon className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-xl">
                    <h3 className="text-white font-bold text-lg mb-2">
                      {image.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {image.category}
                      </span>
                      <span className="text-white text-sm">
                        {formatDate(image.date)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Images Grid */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {activeCategory === "All"
              ? "All Photos"
              : `${activeCategory} Photos`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="relative group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                onClick={() => openModal(image)}
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <EyeIcon className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-sm truncate">
                      {image.title}
                    </h3>
                    {image.featured && (
                      <span className="text-yellow-500 text-sm">⭐</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {image.category}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {new Date(image.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl max-h-full bg-white rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-800" />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                >
                  <ChevronRightIcon className="w-6 h-6 text-gray-800" />
                </button>

                {/* Image */}
                <div className="w-full h-96">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedImage.title}
                    </h2>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedImage.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {selectedImage.description}
                  </p>
                  <div className="flex items-center text-gray-500">
                    <CalendarDaysIcon className="w-5 h-5 mr-2" />
                    <span>{formatDate(selectedImage.date)}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload CTA */}
      </div>
    </div>
  );
};

export default Gallery;
