import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import CommentForm from "../../components/CommentForm";

const Office = () => {
  const [selectedOffice, setSelectedOffice] = useState(null);

  const offices = [
    {
      id: 1,
      name: "Head Office",
      city: "Dangila",
      region: "Amahara",
      address: "Dangila, kebela 05 Awi Zone, Ethiopia",
      phone: "+251582211539",
      email: "info@sosser.coop",
      hours: {
        weekdays: "8:00 AM - 5:00 PM",
        sunday: "Closed",
      },
      services: [
        "All Banking Services",
        "Loan Processing",
        "Insurance",
        "Digital Banking Support",
        "Customer Service",
      ],
      manager: "Mr. Aschalew Mohamed Aliyu",
      staff: 45,
      established: "2002",
      featured: true,
      coordinates: { lat: 9.032, lng: 38.7615 },
    },
    // ... other office data
  ];

  const stats = [
    { label: "Total Offices", value: offices.length, icon: BuildingOfficeIcon },
    { label: "Regions Served", value: "1", icon: MapPinIcon },
    { label: "Total Staff", value: "427+", icon: UserGroupIcon },
    { label: "Years of Service", value: "15+", icon: ClockIcon },
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
            Our Offices
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find a Sosser office near you. We're committed to bringing financial
            services closer to communities across Ethiopia with convenient
            locations and extended hours.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-12 hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Office Locations Map
          </h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1234.5678!2d36.848224!3d11.258804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2set!4v1727807700!5m2!1sen!2set"
              width="100%"
              height="450"
              style={{
                border: 0,
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>

        {/* Featured Offices - Side by Side Layout */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Main Offices
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {offices
              .filter((office) => office.featured)
              .slice(0, 1)
              .map((office, index) => (
                <React.Fragment key={office.id}>
                  {/* Office Info Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {office.name}
                        </h3>
                        <p className="text-blue-600 font-semibold">
                          {office.city}, {office.region}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Est. {office.established}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6 flex-grow">
                      <div className="flex items-start">
                        <MapPinIcon className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Address</p>
                          <p className="text-gray-600">{office.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <PhoneIcon className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Phone</p>
                          <p className="text-gray-600">{office.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Email</p>
                          <p className="text-gray-600">{office.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <ClockIcon className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">
                            Business Hours
                          </p>
                          <p className="text-gray-600">
                            Mon-Fri: {office.hours.weekdays}
                          </p>
                          <p className="text-gray-600">
                            Sunday: {office.hours.sunday}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Services Available:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {office.services.map((service, idx) => (
                          <span
                            key={idx}
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Manager:</span>{" "}
                          {office.manager}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Office Image */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 + 0.2 }}
                    className="relative rounded-xl overflow-hidden shadow-xl h-full min-h-[400px]"
                  >
                    <img
                      src="/2.png"
                      alt={`${office.name} Building`}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-xl font-bold">{office.name}</h3>
                        <p className="text-blue-200">{office.address}</p>
                      </div>
                    </div>
                  </motion.div>
                </React.Fragment>
              ))}
          </div>
        </div>

        {/* All Offices */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            All Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={office.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {office.name}
                    </h3>
                    <p className="text-blue-600 font-medium">{office.city}</p>
                  </div>
                  {office.featured && (
                    <span className="text-yellow-500">⭐</span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    <span className="truncate">{office.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    <span>{office.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span>{office.hours.weekdays}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Key Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {office.services.slice(0, 3).map((service, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {service}
                      </span>
                    ))}
                    {office.services.length > 3 && (
                      <span className="text-blue-600 text-xs">
                        +{office.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <p>Est. {office.established}</p>
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 text-sm">
                    Visit
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <CommentForm />
      </div>
    </div>
  );
};

export default Office;
