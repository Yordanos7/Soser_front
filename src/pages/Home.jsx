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
import { getAnnouncements } from "../api/announcement";
import { getEvents } from "../api/event";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [countersStarted, setCountersStarted] = useState(false);
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

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getAnnouncements();
        setAnnouncements(response);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchAnnouncements();
    fetchEvents();
  }, []);

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
          labels: [
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
          ],
          datasets: [
            {
              label: t("home.growth_insights.chart_label"),
              data: [
                26, 32, 41, 50, 55, 69, 77, 103, 111, 123, 158, 296, 301, 335,
                386, 427,
              ],
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted) {
            setCountersStarted(true);
            startCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    const section = document.querySelector("#loan-disbursement-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, [countersStarted]);

  const startCounters = () => {
    const counters = [
      {
        element: document.querySelector("#short-term-loan"),
        target: 40661181.81,
      },
      {
        element: document.querySelector("#medium-term-loan"),
        target: 1372700511.89,
      },
      { element: document.querySelector("#total-loan"), target: 1413361693 },
    ];

    const duration = 2000; // Animation duration in ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);

    counters.forEach((counter) => {
      if (!counter.element) return;

      let frame = 0;
      const countTo = counter.target;
      const counterText = counter.element;

      const animate = () => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(countTo * progress);

        if (frame <= totalFrames) {
          counterText.textContent = formatNumber(currentCount);
          requestAnimationFrame(animate);
        } else {
          counterText.textContent = formatNumber(countTo);
        }
      };

      requestAnimationFrame(animate);
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K";
    }
    return num.toString();
  };

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
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              {t("home.about.description")}
              The name SOSER Union is derived from the local name of Mount
              Sosser, situated at the border between Dangila and Fagita Lekoma
              woredas. The office of the union is located in Dangla town
              administration, 80 km from Bahir Dar, the Amhara National Regional
              State capital, and 491 km from Addis Ababa. Sosser Saving & Credit
              Cooperative Societies Union LTD was established on March 24, 2008
              (GC) and certified by the ANRS Cooperative Agency under code
              02/1729 on June 19, 2008 (GC). It was founded by 23 primary
              cooperative societies with a paid-up capital share of 666,000.00
              ETB and a membership of 28,194 individuals (23,775 male and 4,419
              female). The union has since grown significantly, now comprising
              427 primary member cooperative societies with a total membership
              of 129,447 individuals (105,287 male and 24,160 female). As of
              June 30, 2025 (GC), the union's financial position includes total
              assets of 1,025,054,954.30 ETB, liabilities of 870,637,281.49 ETB,
              and capital of 154,417,672.81 ETB.
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

      {/* Loan Disbursement Section */}
      <section id="loan-disbursement-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {t("Loan Disbursment")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("Loan Disbursment")}
            </p>
          </motion.div>

          {/* Large Loan Disbursement Numbers */}
          <div className="flex flex-col items-center justify-center mb-16">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Total Loan Disbursement
              </h3>
              <div className="text-5xl md:text-7xl font-bold text-blue-600">
                <span id="total-loan">0</span>
              </div>
              <p className="text-gray-500 mt-2">ETB</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Short Term Loan
                </h4>
                <div className="text-3xl font-bold text-green-600">
                  <span id="short-term-loan">0</span>
                </div>
                <p className="text-gray-500">ETB</p>
              </div>

              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Medium Term Loan
                </h4>
                <div className="text-3xl font-bold text-purple-600">
                  <span id="medium-term-loan">0</span>
                </div>
                <p className="text-gray-500">ETB</p>
              </div>
            </div>
          </div>

          {/* Sosser Office Building Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12"
          >
            <div className="overflow-hidden shadow-xl">
              <img
                src="/2.png"
                alt="Sosser Main Office Building"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Our Headquarters
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our headquarters, located in Dangla town, serves as the central
                hub for Soser Saving & Credit Cooperative Union LTD's
                operations. This facility supports our administrative functions
                and member services, ensuring we deliver accessible and reliable
                financial solutions to our members across seven districts. It
                reflects our commitment to fostering financial inclusion and
                empowering our community through straightforward and effective
                cooperative services.
              </p>
              <Link
                to="/contact/offices"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                <span>Visit Our Locations</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
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
                {announcements.slice(0, 3).map((announcement, index) => (
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
                          {new Date(
                            announcement.publishDate
                          ).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">{announcement.content}</p>
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

            {/* Events */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                {t("home.events.title")}
              </h2>
              <div className="space-y-6">
                {events.slice(0, 3).map((event, index) => (
                  <div
                    key={index}
                    className="bg-green-50 rounded-lg p-6 hover:bg-green-100 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <CalendarDaysIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/news/events"
                  className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold"
                >
                  <span>{t("home.events.view_all")}</span>
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
              {user ? `Welcome, ${user.name}` : t("home.cta.title")}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t("home.cta.description")}
            </p>
            <Link
              to="/services/savings"
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl inline-flex items-center space-x-2"
            >
              <span>Explore our services</span>
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
