import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaLeaf, FaSeedling, FaRobot, FaCloudSun, FaRupeeSign,
  FaFileAlt, FaMapMarkerAlt, FaTachometerAlt, FaArrowRight,
  FaCheckCircle, FaMicrophone, FaCamera, FaChartLine
} from "react-icons/fa";

const stats = [
  { value: "140M+", label: "Indian Farmers" },
  { value: "50+", label: "Crop Diseases Detected" },
  { value: "28", label: "States Covered" },
  { value: "100+", label: "Govt. Schemes Listed" },
];

const features = [
  {
    icon: <FaSeedling className="text-3xl text-green-500" />,
    title: "Crop Disease Detector",
    desc: "Upload a photo of your crop leaf. Our AI instantly identifies the disease and suggests the best cure and pesticide.",
    path: "/disease-detector",
    color: "bg-green-50 border-green-200",
  },
  {
    icon: <FaRobot className="text-3xl text-blue-500" />,
    title: "AI Farming Chat",
    desc: "Ask anything in Hindi, Marathi, or English. Get expert farming advice instantly, 24/7.",
    path: "/ai-chat",
    color: "bg-blue-50 border-blue-200",
  },
  {
    icon: <FaCloudSun className="text-3xl text-yellow-500" />,
    title: "Weather Dashboard",
    desc: "7-day hyper-local forecast with smart sowing and harvesting recommendations based on weather.",
    path: "/weather",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    icon: <FaRupeeSign className="text-3xl text-orange-500" />,
    title: "Mandi Price Tracker",
    desc: "Live crop prices from nearby mandis. Know the best time and place to sell your harvest.",
    path: "/mandi-prices",
    color: "bg-orange-50 border-orange-200",
  },
  {
    icon: <FaFileAlt className="text-3xl text-purple-500" />,
    title: "Government Scheme Finder",
    desc: "Enter your details and instantly find all PM-KISAN, crop insurance, and subsidy schemes you qualify for.",
    path: "/scheme-finder",
    color: "bg-purple-50 border-purple-200",
  },
  {
    icon: <FaMapMarkerAlt className="text-3xl text-red-500" />,
    title: "Nearby Resources Map",
    desc: "Find the nearest Krishi Kendra, seed shop, hospital, and water source on an interactive map.",
    path: "/resource-map",
    color: "bg-red-50 border-red-200",
  },
  {
    icon: <FaTachometerAlt className="text-3xl text-teal-500" />,
    title: "Farm Dashboard",
    desc: "Track your crops, expenses, income, and set reminders for sowing and harvesting seasons.",
    path: "/dashboard",
    color: "bg-teal-50 border-teal-200",
  },
];

const testimonials = [
  {
    name: "Ramesh Patil",
    location: "Nashik, Maharashtra",
    text: "GreenRoot ne meri fasal ki bimari pehchan li sirf ek photo se. Bahut kaam ka app hai!",
    emoji: "👨‍🌾",
  },
  {
    name: "Sunita Devi",
    location: "Pune, Maharashtra",
    text: "PM-KISAN scheme ke liye apply karna itna aasan kabhi nahi tha. GreenRoot sach mein helpful hai.",
    emoji: "👩‍🌾",
  },
  {
    name: "Mahesh Kumar",
    location: "Solapur, Maharashtra",
    text: "Mandi price tracker se mujhe pata chalta hai ki kab aur kahan bechna chahiye. Bahut faayda hua.",
    emoji: "🧑‍🌾",
  },
];

export default function Landing() {
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-600 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-700 bg-opacity-60 px-4 py-2 rounded-full text-green-200 text-sm font-medium mb-6">
                <FaLeaf className="text-green-400" />
                AI-Powered Farming Assistant
              </div>
              <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
                Smart Farming <br />
                <span className="text-green-300">Starts Here</span>
              </h1>
              <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-lg">
                While we code on laptops, 140 million Indian farmers are losing crops because nobody told them what was wrong.{" "}
                <span className="text-white font-semibold">GreenRoot fixes that.</span>
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/disease-detector"
                  className="flex items-center gap-2 bg-white text-green-800 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <FaCamera /> Detect Disease
                </Link>
                <Link
                  to="/ai-chat"
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold border border-green-400 hover:bg-green-500 transition-all"
                >
                  <FaMicrophone /> Talk to AI
                </Link>
              </div>
            </div>

            {/* Stats Card */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-2xl p-6 text-center transition-all duration-300 ${
                    currentStat === i ? "scale-105 bg-opacity-20" : ""
                  }`}
                >
                  <p className="text-4xl font-black text-green-300">{stat.value}</p>
                  <p className="text-green-100 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Everything a Farmer Needs
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              From disease detection to government schemes — all in one place, in your language.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Link
                key={i}
                to={f.path}
                className={`group border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${f.color}`}
              >
                <div className="mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                  Try Now <FaArrowRight className="text-xs" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why GreenRoot */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Why <span className="text-green-600">GreenRoot?</span>
              </h2>
              <div className="space-y-4">
                {[
                  "Detect 50+ crop diseases from a single photo",
                  "Get advice in Hindi, Marathi & English",
                  "Find all government schemes you qualify for",
                  "Check live mandi prices before selling",
                  "Works on low-speed internet connections",
                  "100% free for all Indian farmers",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 text-xl mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 font-medium">{point}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 mt-8 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all"
              >
                Start for Free <FaArrowRight />
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <FaChartLine className="text-green-500 text-2xl" />
                <h3 className="text-xl font-bold text-gray-900">Impact This Season</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Crop Diseases Detected", value: "12,450", color: "bg-green-500" },
                  { label: "Farmers Helped", value: "8,920", color: "bg-blue-500" },
                  { label: "Schemes Applied", value: "5,230", color: "bg-purple-500" },
                  { label: "Mandi Queries", value: "18,300", color: "bg-orange-500" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-bold text-gray-900">{item.value}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${60 + i * 10}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Farmers Love GreenRoot
            </h2>
            <p className="text-gray-500 text-lg">Real stories from real farmers across India</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-green-50 border border-green-100 rounded-2xl p-6 hover:shadow-md transition-all"
              >
                <p className="text-4xl mb-4">{t.emoji}</p>
                <p className="text-gray-700 italic mb-4 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-green-700 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Start Growing Smarter Today
          </h2>
          <p className="text-green-200 text-lg mb-8">
            Join thousands of farmers already using GreenRoot to protect their crops and income.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-green-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all shadow-lg"
            >
              Create Free Account
            </Link>
            <Link
              to="/disease-detector"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-all"
            >
              Try Without Signup
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
