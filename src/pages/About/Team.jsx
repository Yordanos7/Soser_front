import React from "react";
import { motion } from "framer-motion";

const Team = () => {
  const leadershipTeam = [
    {
      id: 1,
      name: "Mr. Aschalew Mohamed Aliyu",
      position: "G/Manager",
      image: "/m.jpg",
      quote:
        "Leading Sosser towards excellence in cooperative banking services.",
      experience: "15+ years in banking leadership",
    },
    {
      id: 2,
      name: "Mr. Bekalu shawul",
      position: "V/Manager",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "Ensuring operational excellence across all branches.",
      experience: "15+ years in financial operations",
    },
  ];

  const divisionHeads = [
    {
      id: 3,
      name: "Mr. Badmaw Getinet",
      position: "Head of Finance, Procurement and Asset Management",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      quote: "Managing resources efficiently to maximize member value.",
      experience: "12+ years in financial management",
    },
    {
      id: 4,
      name: "Mr. Assaye Atalay",
      position: "Head of Saving, Credit and Insurance Division",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      quote: "Developing innovative financial products for our members.",
      experience: "10+ years in credit and insurance",
    },
    {
      id: 5,
      name: "Mr. Daniel",
      position: "Head of Human Resources",
      image: "https://randomuser.me/api/portraits/men/81.jpg",
      quote: "Building a talented team to serve our members better.",
      experience: "9+ years in HR management",
    },
    {
      id: 6,
      name: "Ms. Aida",
      position: "Head of Digital Banking",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "Transforming banking through technology innovation.",
      experience: "8+ years in digital finance",
    },
  ];

  const branchOffices = [
    {
      id: 1,
      name: "Jawi Branch",
      leader: "Getaneh Asabu",
      staff: 12,
      image: "https://source.unsplash.com/random/300x200/?bank,building",
    },
    {
      id: 2,
      name: "Addis kidam Branch",
      leader: "Takele dagnaw",
      staff: 10,
      image: "https://source.unsplash.com/random/300x200/?office,building",
    },
    {
      id: 3,
      name: "Injibara Branch",
      leader: "Yeneneh Kassahun",
      staff: 8,
      image:
        "https://source.unsplash.com/random/300x200/?financial,institution",
    },
    {
      id: 4,
      name: "Fageta Branch",
      leader: "No name",
      staff: 7,
      image: "https://source.unsplash.com/random/300x200/?cooperative,bank",
    },
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
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Our Organizational Structure
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated team that drives Sosser's mission to empower
            communities through innovative financial services across Ethiopia.
          </p>
        </motion.div>

        {/* Leadership Team */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
            Executive Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            {leadershipTeam.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                    <div className="flex-shrink-0">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                        {member.position}
                      </p>
                      <p className="text-sm sm:text-base text-gray-500">
                        {member.experience}
                      </p>
                      <blockquote className="mt-3 sm:mt-4 text-gray-700 italic text-sm sm:text-base md:text-lg">
                        "{member.quote}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Division Heads */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
            Division Leadership
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 md:mb-12">
            {divisionHeads.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col items-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-lg object-cover mb-3 sm:mb-4"
                    />
                    <div className="text-center">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                        {member.position}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                        {member.experience}
                      </p>
                      <blockquote className="text-gray-700 italic text-xs sm:text-sm">
                        "{member.quote}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Branch Offices */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
            Our Branch Network
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 md:mb-8">
              {branchOffices.map((branch) => (
                <motion.div
                  key={branch.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-32 sm:h-40 md:h-48 object-cover"
                  />
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-blue-800 text-base sm:text-lg">
                      {branch.name}
                    </h3>
                    <h3 className="font-bold text-black text-sm sm:text-base">
                      Branch Manager Mr. {branch.leader}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {branch.staff} staff members
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-700 text-sm sm:text-base">
                Total staff across all branches: {totalStaff}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
