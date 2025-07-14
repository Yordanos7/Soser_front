import React from "react";
import { motion } from "framer-motion";
import {
  CurrencyDollarIcon,
  HomeIcon,
  TruckIcon,
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Loans = () => {
  const loanTypes = [
    {
      id: 1,
      name: "Personal Loans",
      icon: CurrencyDollarIcon,
      description:
        "Flexible personal loans for various needs including medical expenses, education, or personal projects.",
      features: [
        "Quick approval",
        "Flexible repayment",
        "No collateral required",
        "Competitive rates",
      ],
    },
    {
      id: 2,
      name: "Agricultural Loans",
      icon: TruckIcon,

      description:
        "Specialized loans for farmers and agricultural businesses to boost productivity and income.",
      features: [
        "Seasonal payment options",
        "Equipment financing",
        "Crop insurance coverage",
        "Agricultural expertise",
      ],
    },
    {
      id: 3,
      name: "Home Loans",
      icon: HomeIcon,

      description:
        "Affordable housing loans to help you build or purchase your dream home.",
      features: [
        "Long-term financing",
        "Property insurance",
        "Construction monitoring",
        "Flexible down payment",
      ],
    },
    {
      id: 4,
      name: "Education Loans",
      icon: AcademicCapIcon,

      description:
        "Investment in your future through education financing for higher studies.",
      features: [
        "Deferred payments",
        "Study abroad support",
        "Course fee coverage",
        "Living expense support",
      ],
    },
  ];

  const requirements = [
    "Valid Ethiopian ID or passport",
    "Proof of income or business registration",
    "Bank statements (last 6 months)",
    "Collateral documentation (if applicable)",
    "Guarantor information",
    "Completed loan application form",
  ];

  const process = [
    {
      step: 1,
      title: "Application",
      description: "Submit your loan application with required documents",
    },
    {
      step: 2,
      title: "Review",
      description: "Our team reviews your application and credit history",
    },
    {
      step: 3,
      title: "Approval",
      description: "Receive approval notification and loan terms",
    },
    {
      step: 4,
      title: "Disbursement",
      description: "Funds are transferred to your account",
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
            Loan Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible loan solutions designed to meet your financial needs and
            help you achieve your goals.
          </p>
        </motion.div>

        {/* Loan Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {loanTypes.map((loan, index) => (
            <motion.div
              key={loan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <loan.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {loan.name}
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6"></div>

              <p className="text-gray-600 mb-6">{loan.description}</p>

              <div className="space-y-2 mb-6">
                {loan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200">
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>

        {/* Application Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Application Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Loan Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-center">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3" />
                <span className="text-gray-700">{requirement}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Interest Rate Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Need Help Calculating?</h2>
          <p className="text-xl mb-8">
            Use our loan calculator to estimate your monthly payments and total
            interest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              <Link to="/loan-calculator">Loan Calculator</Link>
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
              Contact Advisor
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loans;
