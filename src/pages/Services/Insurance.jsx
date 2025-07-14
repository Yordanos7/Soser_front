import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  HeartIcon,
  HomeIcon,
  TruckIcon,
  UserGroupIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const Insurance = () => {
  const insuranceTypes = [
    {
      id: 1,
      name: "Health Insurance",
      icon: HeartIcon,
      coverage: "Up to 1,000,000 ETB",
      premium: "From 2,500 ETB/year",
      description:
        "Comprehensive health coverage for you and your family including hospitalization, medication, and emergency care.",
      benefits: [
        "Hospitalization coverage",
        "Outpatient services",
        "Emergency care",
        "Medication coverage",
        "Preventive care",
      ],
    },
    {
      id: 2,
      name: "Property Insurance",
      icon: HomeIcon,
      coverage: "Up to 5,000,000 ETB",
      premium: "From 5,000 ETB/year",
      description:
        "Protect your home and belongings against fire, theft, natural disasters, and other covered perils.",
      benefits: [
        "Fire damage coverage",
        "Theft protection",
        "Natural disaster coverage",
        "Personal property",
        "Temporary housing",
      ],
    },
    {
      id: 3,
      name: "Vehicle Insurance",
      icon: TruckIcon,
      coverage: "Up to 2,000,000 ETB",
      premium: "From 3,000 ETB/year",
      description:
        "Complete vehicle protection including third-party liability, comprehensive coverage, and roadside assistance.",
      benefits: [
        "Third-party liability",
        "Collision coverage",
        "Theft protection",
        "Roadside assistance",
        "Glass coverage",
      ],
    },
    {
      id: 4,
      name: "Life Insurance",
      icon: UserGroupIcon,
      coverage: "Up to 3,000,000 ETB",
      premium: "From 1,500 ETB/year",
      description:
        "Financial security for your loved ones with term life and whole life insurance options.",
      benefits: [
        "Death benefit",
        "Terminal illness coverage",
        "Disability benefits",
        "Savings component",
        "Tax advantages",
      ],
    },
  ];

  const claimProcess = [
    {
      step: 1,
      title: "Report Incident",
      description: "Contact us immediately to report your claim",
    },
    {
      step: 2,
      title: "Submit Documents",
      description: "Provide required documentation and evidence",
    },
    {
      step: 3,
      title: "Assessment",
      description: "Our team evaluates your claim",
    },
    {
      step: 4,
      title: "Settlement",
      description: "Receive your compensation promptly",
    },
  ];

  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Reliable Coverage",
      description:
        "Comprehensive protection you can count on when you need it most.",
    },
    {
      icon: DocumentTextIcon,
      title: "Simple Claims",
      description:
        "Straightforward claims process with quick settlements and minimal paperwork.",
    },
    {
      icon: HeartIcon,
      title: "Customer Care",
      description:
        "24/7 customer support and dedicated claims assistance team.",
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
            Insurance Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Protect what matters most with our comprehensive insurance solutions
            designed for Ethiopian families and businesses.
          </p>
        </motion.div>

        {/* Insurance Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {insuranceTypes.map((insurance, index) => (
            <motion.div
              key={insurance.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <insurance.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {insurance.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Coverage Limit</p>
                  <p className="font-semibold text-gray-900">
                    {insurance.coverage}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Premium</p>
                  <p className="font-semibold text-gray-900">
                    {insurance.premium}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{insurance.description}</p>

              <div className="space-y-2 mb-6">
                <p className="font-semibold text-gray-900 mb-3">
                  Key Benefits:
                </p>
                {insurance.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center">
                    <ShieldCheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200">
                Get Quote
              </button>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Sosser Insurance?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Claims Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Claims Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {claimProcess.map((item, index) => (
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

        {/* Emergency Contact */}
      </div>
    </div>
  );
};

export default Insurance;
