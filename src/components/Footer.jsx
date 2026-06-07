import React from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaGithub, FaTwitter, FaLinkedin, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <FaLeaf className="text-green-400 text-2xl" />
              <span className="text-white font-bold text-xl">GreenRoot</span>
            </div>
            <p className="text-green-300 text-sm leading-relaxed">
              AI-powered smart farming assistant for Indian farmers. From the ground up.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-green-400 hover:text-white transition-colors"><FaGithub size={18} /></a>
              <a href="#" className="text-green-400 hover:text-white transition-colors"><FaTwitter size={18} /></a>
              <a href="#" className="text-green-400 hover:text-white transition-colors"><FaLinkedin size={18} /></a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-green-300">
              <li><Link to="/disease-detector" className="hover:text-white transition-colors">Disease Detector</Link></li>
              <li><Link to="/ai-chat" className="hover:text-white transition-colors">AI Chat Assistant</Link></li>
              <li><Link to="/weather" className="hover:text-white transition-colors">Weather Forecast</Link></li>
              <li><Link to="/mandi-prices" className="hover:text-white transition-colors">Mandi Prices</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-green-300">
              <li><Link to="/scheme-finder" className="hover:text-white transition-colors">Govt. Schemes</Link></li>
              <li><Link to="/resource-map" className="hover:text-white transition-colors">Resource Map</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Farm Dashboard</Link></li>
            </ul>
          </div>

          {/* Helpline */}
          <div>
            <h4 className="text-white font-semibold mb-4">Emergency Helplines</h4>
            <ul className="space-y-2 text-sm text-green-300">
              <li>🌾 Kisan Call Center: <span className="text-white font-medium">1800-180-1551</span></li>
              <li>🌦️ Weather Alert: <span className="text-white font-medium">1800-11-2960</span></li>
              <li>🏥 PM-KISAN: <span className="text-white font-medium">155261</span></li>
              <li>📞 Soil Health: <span className="text-white font-medium">1800-180-1551</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-green-400 text-sm">
            © 2025 GreenRoot. All rights reserved.
          </p>
          <p className="text-green-400 text-sm flex items-center gap-1">
            Made with <FaHeart className="text-red-400" /> for Indian Farmers
          </p>
        </div>
      </div>
    </footer>
  );
}
