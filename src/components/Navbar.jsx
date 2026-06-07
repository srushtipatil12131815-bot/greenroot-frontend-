import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaLeaf, FaBars, FaTimes, FaHome, FaSeedling, FaRobot,
  FaCloudSun, FaRupeeSign, FaFileAlt, FaMapMarkerAlt,
  FaTachometerAlt, FaSignInAlt, FaUserPlus, FaSignOutAlt
} from "react-icons/fa";

const navLinks = [
  { path: "/", label: "Home", icon: <FaHome /> },
  { path: "/disease-detector", label: "Disease Detector", icon: <FaSeedling /> },
  { path: "/ai-chat", label: "AI Chat", icon: <FaRobot /> },
  { path: "/weather", label: "Weather", icon: <FaCloudSun /> },
  { path: "/mandi-prices", label: "Mandi Prices", icon: <FaRupeeSign /> },
  { path: "/scheme-finder", label: "Schemes", icon: <FaFileAlt /> },
  { path: "/resource-map", label: "Resources", icon: <FaMapMarkerAlt /> },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-green-700 font-bold text-xl">
            <FaLeaf className="text-green-500 text-2xl" />
            <span>GreenRoot</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${location.pathname === link.path
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                  }`}
              >
                <span className="text-xs">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-green-50 hover:text-green-600 transition-all"
                >
                  <FaTachometerAlt className="text-xs" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                >
                  <FaSignOutAlt className="text-xs" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-green-700 border border-green-300 hover:bg-green-50 transition-all"
                >
                  <FaSignInAlt className="text-xs" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-all"
                >
                  <FaUserPlus className="text-xs" />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-600 hover:text-green-600 text-xl p-2"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                ${location.pathname === link.path
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 space-y-1">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-green-50"
                >
                  <FaTachometerAlt /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-green-700 hover:bg-green-50"
                >
                  <FaSignInAlt /> Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700"
                >
                  <FaUserPlus /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
