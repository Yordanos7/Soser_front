import React from "react";
import { motion } from "framer-motion";

const Team = () => {
  const leadershipTeam = [
    {
      id: 1,
      name: "Mr. Aschu",
      position: "G/Manager",
      image: "/1.png",
      quote:
        "Leading Sosser towards excellence in cooperative banking services.",
      experience: "18+ years in banking leadership",
    },
    {
      id: 2,
      name: "Ms. Tigist",
      position: "V/Manager",
      image: "/2.png",
      quote: "Ensuring operational excellence across all branches.",
      experience: "15+ years in financial operations",
    },
  ];

  const divisionHeads = [
    {
      id: 3,
      name: "Mr. Solomon",
      position: "Head of Finance, Procurement and Asset Management",
      image: "/3.png",
      quote: "Managing resources efficiently to maximize member value.",
      experience: "12+ years in financial management",
    },
    {
      id: 4,
      name: "Ms. Hanna",
      position: "Head of Saving, Credit and Insurance Division",
      image: "/4.png",
      quote: "Developing innovative financial products for our members.",
      experience: "10+ years in credit and insurance",
    },
  ];

  const branchOffices = [
    { id: 1, name: "Dangila Branch", staff: 12 },
    { id: 2, name: "Injbara Branch", staff: 10 },
    { id: 3, name: "Fageta Branch", staff: 8 },
    { id: 4, name: "Jawi Branch", staff: 7 },
    { id: 5, name: "Bahir Dar Branch", staff: 15 },
  ];

  const totalStaff = branchOffices.reduce(
    (sum, branch) => sum + branch.staff,
    0
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
            Our Organizational Structure
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated team that drives Sosser's mission to empower
            communities through innovative financial services across Ethiopia.
          </p>
        </motion.div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Executive Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {leadershipTeam.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-8">
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 font-semibold mb-2">
                        {member.position}
                      </p>
                      <p className="text-sm text-gray-500">
                        {member.experience}
                      </p>
                    </div>
                  </div>
                  <blockquote className="mt-6 text-gray-700 italic">
                    "{member.quote}"
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Division Heads */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Division Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {divisionHeads.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-8">
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 font-semibold mb-2">
                        {member.position}
                      </p>
                      <p className="text-sm text-gray-500">
                        {member.experience}
                      </p>
                    </div>
                  </div>
                  <blockquote className="mt-6 text-gray-700 italic">
                    "{member.quote}"
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Branch Offices */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Branch Network
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              {branchOffices.map((branch) => (
                <motion.div
                  key={branch.id}
                  whileHover={{ y: -5 }}
                  className="bg-blue-50 rounded-lg p-4 text-center"
                >
                  <h3 className="font-bold text-blue-800">{branch.name}</h3>
                  <p className="text-gray-600">{branch.staff} staff members</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-800">
                Total Staff Across All Branches:{" "}
                <span className="text-blue-600">{totalStaff}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            Our Guiding Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Integrity</h3>
              <p>
                We conduct all our operations with honesty and transparency,
                building trust with our members.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p>
                We continuously develop new financial solutions to meet the
                evolving needs of our communities.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Inclusion</h3>
              <p>
                We serve all members of society, especially those underserved by
                traditional banking.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
