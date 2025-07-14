import React from "react";
import { motion } from "framer-motion";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Mr. Ashu ",
      position: "Chief Executive Officer",
      image: "./1.png",
      quote:
        "Leading Sosser towards financial inclusion for all Ethiopian communities.",
      experience: "15+ years in cooperative banking",
    },
    {
      id: 2,
      name: "Ms. Hanna Bekele",
      position: "Chief Financial Officer",
      image: "/images/team/cfo.jpg",
      quote: "Ensuring transparent and sustainable financial operations.",
      experience: "12+ years in financial management",
    },
    {
      id: 3,
      name: "Mr. Solomon Getachew",
      position: "Chief Technology Officer",
      image: "/images/team/cto.jpg",
      quote: "Driving digital transformation in Ethiopian cooperative banking.",
      experience: "10+ years in fintech development",
    },
    {
      id: 4,
      name: "Ms. Tigist Hailu",
      position: "Head of Operations",
      image: "/images/team/ops.jpg",
      quote: "Streamlining processes to serve our members better.",
      experience: "8+ years in operations management",
    },
  ];

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
            Our Leadership Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated professionals who are driving Sosser's mission to
            empower communities through innovative financial services across
            Ethiopia.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    <img src="/1.png" alt="" className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-2">
                      {member.position}
                    </p>
                    <p className="text-sm text-gray-500">{member.experience}</p>
                  </div>
                </div>
                <blockquote className="mt-6 text-gray-700 italic">
                  "{member.quote}"
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Integrity
              </h3>
              <p className="text-gray-600">
                We conduct our business with honesty, transparency, and ethical
                standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for excellence in every service we provide to our
                members.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                We embrace innovation to better serve our communities and
                members.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
