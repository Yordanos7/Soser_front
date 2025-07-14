
import React from 'react';
import { motion } from 'framer-motion';

const Partners = () => {
  const partners = [
    {
      id: 1,
      name: 'Commercial Bank of Ethiopia',
      category: 'Banking Partner',
      description: 'Strategic partnership for international transactions and foreign exchange services.',
      logo: '/images/partners/cbe.png',
      website: 'https://combanketh.et'
    },
    {
      id: 2,
      name: 'Ethio Telecom',
      category: 'Technology Partner',
      description: 'Collaboration for mobile banking and digital payment solutions.',
      logo: '/images/partners/ethiotelecom.png',
      website: 'https://ethiotelecom.et'
    },
    {
      id: 3,
      name: 'United Nations Development Programme (UNDP)',
      category: 'Development Partner',
      description: 'Supporting rural development and financial inclusion initiatives.',
      logo: '/images/partners/undp.png',
      website: 'https://undp.org'
    },
    {
      id: 4,
      name: 'World Bank Group',
      category: 'Financial Partner',
      description: 'Funding support for microfinance and agricultural lending programs.',
      logo: '/images/partners/worldbank.png',
      website: 'https://worldbank.org'
    },
    {
      id: 5,
      name: 'Ethiopian Ministry of Finance',
      category: 'Government Partner',
      description: 'Regulatory support and policy alignment for cooperative banking.',
      logo: '/images/partners/mof.png',
      website: 'https://mof.gov.et'
    },
    {
      id: 6,
      name: 'German Development Cooperation (GIZ)',
      category: 'Development Partner',
      description: 'Technical assistance and capacity building programs.',
      logo: '/images/partners/giz.png',
      website: 'https://giz.de'
    }
  ];

  const partnerCategories = [
    { name: 'Banking Partners', count: 1, color: 'bg-blue-100 text-blue-800' },
    { name: 'Technology Partners', count: 1, color: 'bg-green-100 text-green-800' },
    { name: 'Development Partners', count: 2, color: 'bg-purple-100 text-purple-800' },
    { name: 'Financial Partners', count: 1, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Government Partners', count: 1, color: 'bg-red-100 text-red-800' }
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
            Our Strategic Partners
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We collaborate with leading organizations to expand our reach and enhance 
            our services for the Ethiopian community.
          </p>
          
          {/* Partner Categories */}
          <div className="flex flex-wrap justify-center gap-4">
            {partnerCategories.map((category, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium ${category.color}`}
              >
                {category.name} ({category.count})
              </span>
            ))}
          </div>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center h-20 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {partner.name.split(' ').map(word => word[0]).slice(0, 2).join('')}
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {partner.name}
                </h3>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-4">
                  {partner.category}
                </span>
                <p className="text-gray-600 mb-6">
                  {partner.description}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600">
                Access to international markets and services
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Latest technology and financial solutions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expertise</h3>
              <p className="text-gray-600">
                Shared knowledge and best practices
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth</h3>
              <p className="text-gray-600">
                Sustainable development and expansion
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Interested in Partnership?
          </h2>
          <p className="text-gray-600 mb-8">
            Join us in empowering Ethiopian communities through financial inclusion.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            Contact Partnership Team
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Partners;
