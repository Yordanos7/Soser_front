import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { getDocuments, downloadDocument } from "../../api/document";
import { saveAs } from "file-saver";

const Documents = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getDocuments();
        setDocuments(response.documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleDownload = async (id, title) => {
    try {
      const blob = await downloadDocument(id);
      saveAs(blob, title);
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  const categories = [
    { name: "All Documents", count: documents.length, active: true },
    {
      name: "Financial Reports",
      count: documents.filter((doc) => doc.category === "Financial Reports")
        .length,
      active: false,
    },
    {
      name: "Impact Studies",
      count: documents.filter((doc) => doc.category === "Impact Studies")
        .length,
      active: false,
    },
    {
      name: "Case Studies",
      count: documents.filter((doc) => doc.category === "Case Studies").length,
      active: false,
    },
    {
      name: "ESG Reports",
      count: documents.filter((doc) => doc.category === "ESG Reports").length,
      active: false,
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDownloads = (downloads) => {
    if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}k`;
    }
    return downloads.toString();
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
            Documents & Reports
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our comprehensive collection of reports, studies, and
            documentation showcasing Sosser's impact and transparency in serving
            Ethiopian communities.
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
            <DocumentTextIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">
              {documents.length}
            </h3>
            <p className="text-gray-600">Total Documents</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <ArrowDownTrayIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">
              {formatDownloads(
                documents.reduce((total, doc) => total + doc.downloads, 0)
              )}
            </h3>
            <p className="text-gray-600">Total Downloads</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <ChartBarIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">
              {categories.length - 1}
            </h3>
            <p className="text-gray-600">Categories</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <CalendarDaysIcon className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">2024</h3>
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
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                category.active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Featured Documents */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Documents
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {documents
              .filter((doc) => doc.featured)
              .slice(0, 2)
              .map((document, index) => (
                <motion.div
                  key={document.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {document.type}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {document.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{document.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">File Size</p>
                      <p className="font-medium text-gray-900">
                        {document.size}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pages</p>
                      <p className="font-medium text-gray-900">
                        {document.pages}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Published</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(document.publishDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Downloads</p>
                      <p className="font-medium text-gray-900">
                        {formatDownloads(document.downloads)}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() =>
                        handleDownload(document.id, document.title)
                      }
                      className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 flex items-center justify-center"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                      Download
                    </button>
                    <button className="border-2 border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center">
                      <EyeIcon className="w-5 h-5 mr-2" />
                      Preview
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* All Documents */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            All Documents
          </h2>
          <div className="space-y-4">
            {documents.map((document, index) => (
              <motion.div
                key={document.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {document.title}
                        </h3>
                        {document.featured && (
                          <span className="text-yellow-500">⭐</span>
                        )}
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                          {document.type}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {document.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{document.size}</span>
                        <span>•</span>
                        <span>{document.pages} pages</span>
                        <span>•</span>
                        <span>{formatDate(document.publishDate)}</span>
                        <span>•</span>
                        <span>
                          {formatDownloads(document.downloads)} downloads
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        handleDownload(document.id, document.title)
                      }
                      className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 flex items-center"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                      Download
                    </button>
                    <button className="border-2 border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
                      <EyeIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">
            Subscribe to receive notifications when new reports and documents
            are published.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Documents;
