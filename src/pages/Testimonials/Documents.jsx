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
import { saveAs } from "file-saver";
import { getDocuments, downloadDocument } from "../../api/document";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [downloadingDocId, setDownloadingDocId] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All Documents");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleDownload = (id, title) => {
    const link = document.createElement("a");
    link.href = `http://localhost:5000/api/documents/download/${id}`;
    link.setAttribute("download", title);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const categories = [
    { name: "All Documents", count: documents.length },
    {
      name: "Financial Reports",
      count: documents.filter((doc) => doc.category === "Financial Reports")
        .length,
    },
    {
      name: "Impact Studies",
      count: documents.filter((doc) => doc.category === "Impact Studies")
        .length,
    },
    {
      name: "Case Studies",
      count: documents.filter((doc) => doc.category === "Case Studies").length,
    },
    {
      name: "ESG Reports",
      count: documents.filter((doc) => doc.category === "ESG Reports").length,
    },
  ];

  const filteredDocuments =
    activeCategory === "All Documents"
      ? documents
      : documents.filter((doc) => doc.category === activeCategory);

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
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Documents & Reports
          </h1>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
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
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12"
        >
          <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-3 md:p-6 text-center">
            <DocumentTextIcon className="w-6 md:w-8 h-6 md:h-8 text-blue-600 mx-auto mb-1 md:mb-2" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              {documents.length}
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Total Documents
            </p>
          </div>
          <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-3 md:p-6 text-center">
            <ArrowDownTrayIcon className="w-6 md:w-8 h-6 md:h-8 text-green-600 mx-auto mb-1 md:mb-2" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              {formatDownloads(
                documents.reduce((total, doc) => total + doc.downloads, 0)
              )}
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Total Downloads
            </p>
          </div>
          <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-3 md:p-6 text-center">
            <ChartBarIcon className="w-6 md:w-8 h-6 md:h-8 text-purple-600 mx-auto mb-1 md:mb-2" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              {categories.length - 1}
            </h3>
            <p className="text-sm md:text-base text-gray-600">Categories</p>
          </div>
          <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-3 md:p-6 text-center">
            <CalendarDaysIcon className="w-6 md:w-8 h-6 md:h-8 text-red-600 mx-auto mb-1 md:mb-2" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              2024
            </h3>
            <p className="text-sm md:text-base text-gray-600">Latest Year</p>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-2"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category.name)}
              className={`px-3 md:px-6 py-1 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${
                activeCategory === category.name
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {isMobile
                ? `${category.name.split(" ")[0]} (${category.count})`
                : `${category.name} (${category.count})`}
            </button>
          ))}
        </motion.div>

        {/* Featured Documents */}
        {filteredDocuments.filter((doc) => doc.featured).length > 0 && (
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
              Featured Documents
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {filteredDocuments
                .filter((doc) => doc.featured)
                .slice(0, 2)
                .map((document, index) => (
                  <motion.div
                    key={document.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-6 md:p-8 hover:shadow-lg md:hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-3 md:mb-4">
                      <div className="w-10 md:w-12 h-10 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 md:mr-4">
                        <DocumentTextIcon className="w-5 md:w-6 h-5 md:h-6 text-blue-600" />
                      </div>
                      <div>
                        <span className="bg-blue-100 text-blue-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                          {document.type}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                      {document.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
                      {document.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">
                          File Size
                        </p>
                        <p className="font-medium text-gray-900 text-sm md:text-base">
                          {document.size}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">
                          Pages
                        </p>
                        <p className="font-medium text-gray-900 text-sm md:text-base">
                          {document.pages}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">
                          Published
                        </p>
                        <p className="font-medium text-gray-900 text-sm md:text-base">
                          {formatDate(document.publishDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">
                          Downloads
                        </p>
                        <p className="font-medium text-gray-900 text-sm md:text-base">
                          {formatDownloads(document.downloads)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <button
                        onClick={() =>
                          handleDownload(document.id, document.title)
                        }
                        disabled={downloadingDocId === document.id}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 md:py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50 text-sm md:text-base"
                      >
                        {downloadingDocId === document.id ? (
                          `Downloading... ${downloadProgress}%`
                        ) : (
                          <>
                            <ArrowDownTrayIcon className="w-4 md:w-5 h-4 md:h-5 mr-1 md:mr-2" />
                            Download
                          </>
                        )}
                      </button>
                      <button className="border-2 border-gray-300 text-gray-600 px-4 md:px-6 py-2 md:py-3 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center text-sm md:text-base">
                        <EyeIcon className="w-4 md:w-5 h-4 md:h-5 mr-1 md:mr-2" />
                        Preview
                      </button>
                    </div>
                    {downloadingDocId === document.id && (
                      <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5 mt-3 md:mt-4">
                        <div
                          className="bg-blue-600 h-2 md:h-2.5 rounded-full"
                          style={{ width: `${downloadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* All Documents */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
            {activeCategory === "All Documents"
              ? "All Documents"
              : activeCategory}
          </h2>
          <div className="space-y-3 md:space-y-4">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((document, index) => (
                <motion.div
                  key={document.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-4 md:p-6 hover:shadow-lg md:hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start md:items-center space-x-3 md:space-x-4 flex-1">
                      <div className="w-10 md:w-12 h-10 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <DocumentTextIcon className="w-5 md:w-6 h-5 md:h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-1 md:space-y-0 mb-1 md:mb-2">
                          <h3 className="text-base md:text-lg font-bold text-gray-900">
                            {document.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {document.featured && (
                              <span className="text-yellow-500 text-sm">
                                ⭐
                              </span>
                            )}
                            <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs md:text-sm">
                              {document.type}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-xs md:text-sm mb-2 line-clamp-2">
                          {document.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
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
                    <div className="flex space-x-2 justify-end">
                      <button
                        onClick={() =>
                          handleDownload(document.id, document.title)
                        }
                        disabled={downloadingDocId === document.id}
                        className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 md:px-6 py-1 md:py-2 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 flex items-center disabled:opacity-50 text-xs md:text-sm"
                      >
                        {downloadingDocId === document.id ? (
                          `${downloadProgress}%`
                        ) : (
                          <>
                            <ArrowDownTrayIcon className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                            {isMobile ? "DL" : "Download"}
                          </>
                        )}
                      </button>
                      <button className="border-2 border-gray-300 text-gray-600 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 text-xs md:text-sm">
                        <EyeIcon className="w-3 md:w-4 h-3 md:h-4" />
                      </button>
                    </div>
                  </div>
                  {downloadingDocId === document.id && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2.5 mt-3">
                      <div
                        className="bg-blue-600 h-1.5 md:h-2.5 rounded-full"
                        style={{ width: `${downloadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="bg-white rounded-xl p-8 text-center">
                <p className="text-gray-500">
                  No documents found in this category
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 md:mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg md:rounded-xl shadow-lg p-6 md:p-8 text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
            Stay Updated
          </h2>
          <p className="text-base md:text-xl mb-6 md:mb-8">
            Subscribe to receive notifications when new reports and documents
            are published.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-lg text-gray-900 text-sm md:text-base"
            />
            <button className="bg-white text-blue-600 px-4 md:px-8 py-2 md:py-3 rounded-lg font-medium md:font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm md:text-base">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Documents;
