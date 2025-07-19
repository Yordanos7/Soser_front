import React, { useState } from "react";
import { motion } from "framer-motion";

const Partners = () => {
  const partners = [
    {
      id: 1,
      name: "Commercial Bank of Ethiopia",
      category: "Banking Partner",
      description:
        "Strategic partnership for international transactions and foreign exchange services.",
      logo: "https://play-lh.googleusercontent.com/kKGUk63iUIMXF-SL4AklHhZnQesw3-jZT2MR6NuX-xS54ncaZJ-8tlJETZdQYyZ5-g",
      website: "https://combanketh.et",
    },
    {
      id: 2,
      name: "Development Bank of Ethiopia",
      category: "Banking Partner",
      description:
        "Collaboration for development projects and long-term financing.",
      logo: "https://upload.wikimedia.org/wikipedia/en/f/f9/Development_Bank_of_Ethiopia.png",
      website: "https://dbe.com.et/",
    },
    {
      id: 3,
      name: "Awash Bank",
      category: "Banking Partner",
      description:
        "Supporting rural development and financial inclusion initiatives.",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm0uJyPvAfa1gbBjZhdcOz8qadnSOcvBAXAQ&s",
      website: "https://awashbank.com/",
    },
    {
      id: 4,
      name: "Hibret Bank",
      category: "Financial Partner",
      description:
        "Funding support for microfinance and agricultural lending programs.",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS15byYSwk8yXw7M6X_qDVs0l5cbxBrUOD4Yw&s",
      website: "https://www.hibretbank.com.et/",
    },
    {
      id: 5,
      name: "Abay Bank",
      category: "Banking Partner",
      description: "Commercial banking services and financial solutions.",
      logo: "https://i.ytimg.com/vi/8MO-eKkD48k/sddefault.jpg",
      website: "https://www.abaybanksc.com/",
    },
    {
      id: 6,
      name: "Cooperative Bank of Oromia",
      category: "Banking Partner",
      description: "Financial services for cooperatives and SMEs.",
      logo: "https://coopbankoromia.com.et/wp-content/uploads/2021/12/Cooperative_Bank_of_Oromia.png",
      website: "https://coopbankoromia.com.et/",
    },
    {
      id: 7,
      name: "Tele communication",
      category: "Banking Partner",
      description: "Financial services for cooperatives and SMEs.",
      logo: "https://ethiopianembassy.be/wp-content/uploads/EthioTelecom-_-Ethiopia.jpg",
      website: "https://coopbankoromia.com.et/",
    },
    {
      id: 8,
      name: "Ethiopian ministry of finance",
      category: "Banking Partner",
      description: "Financial services for cooperatives and SMEs.",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefUSsl4FBLp7yU3bohW2XiYJ9LoT8AnYGPw&s",
      website: "https://coopbankoromia.com.et/",
    },
    {
      id: 9,
      name: "Municipality and mayor office",
      category: "Banking Partner",
      description: "Financial services for cooperatives and SMEs.",
      logo: "/office.png",
      website: "https://coopbankoromia.com.et/",
    },
    {
      id: 10,
      name: "ATA Ngo ,CORDI,HELBETASE,",
      category: "Banking Partner",
      description: "Financial services for cooperatives and SMEs.",
      logo: "https://ane-ethiopia.org/Assets/images/Background/Partner%20Logo.jpg",
      website: "https://coopbankoromia.com.et/",
    },
    {
      id: 11,
      name: "Admas multi purpose cooperative union ltd",
      category: "Banking Partner",
      description: "Financial services for cooperatives and SMEs.",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL-f7BWg8p4F63jRxCJ3jbDDOv135Ld3jlrL47YeDiqMJZVlcQt9EG9sfmeSNn6wqdfBw&usqp=CAU",
      website: "https://coopbankoromia.com.et/",
    },
    {
      id: 12,
      name: "KOKEB SACCOOP UNION LTD",
      category: "Banking Partner",
      description: "Financial services for cooperatives and SMEs.",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvpsq0a0ATvQkbR8rjBDXam4wGY8PNDkDNOQ&s",
      website: "https://coopbankoromia.com.et/",
    },
  ];

  const partnerCategories = [
    {
      name: "All Partners",
      value: "all",
      count: partners.length,
      color: "bg-gray-100 text-gray-800",
    },
    {
      name: "Banking Partners",
      value: "Banking Partner",
      count: partners.filter((p) => p.category === "Banking Partner").length,
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Financial Partners",
      value: "Financial Partner",
      count: partners.filter((p) => p.category === "Financial Partner").length,
      color: "bg-green-100 text-green-800",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPartners =
    selectedCategory === "all"
      ? partners
      : partners.filter((partner) =>
          partner.category.includes(selectedCategory)
        );

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
            Our Strategic Partners
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We collaborate with leading organizations to expand our reach and
            enhance our services for the Ethiopian community.
          </p>

          {/* Partner Categories */}
          <div className="flex flex-wrap justify-center gap-4">
            {partnerCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  category.color
                } ${
                  selectedCategory === category.value
                    ? "ring-2 ring-offset-2 ring-blue-500"
                    : ""
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center h-32 mb-6">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full object-contain max-w-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/150?text=Logo+Not+Found";
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {partner.name
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {partner.name}
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
                    partner.category === "Banking Partner"
                      ? "bg-blue-100 text-blue-800"
                      : partner.category === "Financial Partner"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {partner.category}
                </span>
                <p className="text-gray-600 mb-6">
                  {partner.description || "No description available"}
                </p>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Visit Website →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partnership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Partnership Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Global Reach
              </h3>
              <p className="text-gray-600">
                Access to international markets and services
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                Latest technology and financial solutions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Expertise
              </h3>
              <p className="text-gray-600">
                Shared knowledge and best practices
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Growth
              </h3>
              <p className="text-gray-600">
                Sustainable development and expansion
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
      </div>
    </div>
  );
};

export default Partners;
