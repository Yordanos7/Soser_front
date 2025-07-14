import React, { useState, useEffect, useRef, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  BanknotesIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  UserIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Chart from "chart.js/auto";

const Home = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = t("home.hero.title_typed");

  const heroImages = ["./1.png", "./2.png", "./3.png", "./2.png"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        setTimeout(() => {
          index = 0;
          setTypedText("");
        }, 1000); // Pause before restarting
      }
    }, 150); // Typing speed

    return () => clearInterval(typingInterval);
  }, [fullText]);

  const services = [
    {
      icon: BanknotesIcon,
      title: t("home.services.items.savings.title"),
      description: t("home.services.items.savings.description"),
      link: "/services/savings",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: DocumentTextIcon,
      title: t("home.services.items.loans.title"),
      description: t("home.services.items.loans.description"),
      link: "/services/loans",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: ShieldCheckIcon,
      title: t("home.services.items.insurance.title"),
      description: t("home.services.items.insurance.description"),
      link: "/services/insurance",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: DevicePhoneMobileIcon,
      title: t("home.services.items.digital_banking.title"),
      description: t("home.services.items.digital_banking.description"),
      link: "/services/digital",
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  const announcements = t("home.announcements.items", { returnObjects: true });
  const latestNews = t("home.latest_news.items", { returnObjects: true });

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["2010", "2011", "2012", "2013", "2014", "2015"],
          datasets: [
            {
              label: t("home.growth_insights.chart_label"),
              data: [123, 158, 296, 301, 335, 386],
              borderColor: "rgba(16, 185, 129, 1)",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              fill: true,
              tension: 0.4,
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: t("home.growth_insights.chart_y_axis"),
              },
            },
            x: {
              title: {
                display: true,
                text: t("home.growth_insights.chart_x_axis"),
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [t]);

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            key={currentSlide}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <img
              src={heroImages[currentSlide]}
              alt="Sosser Hero"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-900/60"></div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-4xl"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {t("home.hero.title_part1")}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mt-9">
                  {typedText}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
                {t("home.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/get-started"
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>{t("home.hero.get_started")}</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <Link
                  to="/about/mission"
                  className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300 flex items-center justify-center"
                >
                  {t("home.hero.learn_more")}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Sosser Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {t("home.about.title")}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("home.about.description")}
            </p>
            <Link
              to="/about/mission"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-green-700 transition-all duration-300"
            >
              <span>{t("home.about.learn_more")}</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {t("home.services.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("home.services.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    to={service.link}
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    <span>
                      {t(
                        `home.services.items.${
                          Object.keys(
                            t("home.services.items", { returnObjects: true })
                          )[index]
                        }.link`
                      )}
                    </span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Insights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {t("home.growth_insights.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("home.growth_insights.description")}
            </p>
          </motion.div>
          <div className="relative h-96">
            <canvas ref={chartRef} className="w-full h-full"></canvas>
          </div>
        </div>
      </section>

      {/* Announcements & Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Announcements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                {t("home.announcements.title")}
              </h2>
              <div className="space-y-6">
                {announcements.map((announcement, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 rounded-lg p-6 hover:bg-blue-100 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <CalendarDaysIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {announcement.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {announcement.date}
                        </p>
                        <p className="text-gray-600">{announcement.excerpt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/news/announcements"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  <span>{t("home.announcements.view_all")}</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Latest News */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                {t("home.latest_news.title")}
              </h2>
              <div className="space-y-6">
                {latestNews.map((news, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <UserIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {news.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                          <span>{news.date}</span>
                          <span>•</span>
                          <span>{news.author}</span>
                        </div>
                        <p className="text-gray-600">{news.excerpt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/news/announcements"
                  className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold"
                >
                  <span>{t("home.latest_news.view_all")}</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t("home.cta.title")}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t("home.cta.description")}
            </p>
            <Link
              to="/get-started"
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl inline-flex items-center space-x-2"
            >
              <span>{t("home.cta.get_started")}</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default function WrappedHome() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
