import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EyeIcon } from "@heroicons/react/24/outline";

const API_URL = "http://localhost:5000/api/media";

const ManageGallery = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get token from localStorage (or use your AuthContext)
  const token = localStorage.getItem("sosser_token");

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch gallery data");
        }
        const data = await response.json();
        setMedia(data.media || []);
      } catch (err) {
        setError(err.message || "Error fetching gallery data");
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [token]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Gallery</h1>
      {loading && <div>Loading gallery...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {media.length === 0 && (
            <div className="col-span-full text-gray-500">No media found.</div>
          )}
          {media.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              {item.type === "image" && (
                <img
                  src={`http://localhost:5000/${item.url}`}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{item.date}</span>
                  <span
                    className={
                      item.status === "published"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                  >
                    {item.status}
                  </span>
                </div>
                <div className="mt-2 flex gap-2">
                  <a
                    href={`http://localhost:5000/${item.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    <EyeIcon className="w-4 h-4 mr-1" />
                    View
                  </a>
                  {/* Add edit/delete buttons here if needed */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
