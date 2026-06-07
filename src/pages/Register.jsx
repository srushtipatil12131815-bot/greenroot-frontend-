import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaLeaf, FaEnvelope, FaLock, FaUser, FaPhone,
  FaMapMarkerAlt, FaSpinner, FaEye, FaEyeSlash
} from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const states = [
  "Maharashtra", "Punjab", "Uttar Pradesh", "Madhya Pradesh",
  "Rajasthan", "Gujarat", "Karnataka", "Andhra Pradesh", "West Bengal", "Bihar"
];

const languages = ["English", "Hindi", "Marathi"];

export default function Register() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "",
    state: "", language: "English"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        state: form.state,
        language: form.language,
      });
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4 shadow-lg">
            <FaLeaf className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-black text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-1">Join thousands of farmers on GreenRoot</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-4 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ramesh Patil"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone Number</label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                />
              </div>
            </div>

            {/* State & Language */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">State</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all bg-white"
                  >
                    <option value="">Select</option>
                    {states.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Language</label>
                <select
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all bg-white"
                >
                  {languages.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  required
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Password match indicator */}
            {form.confirmPassword && (
              <p className={`text-xs font-medium ${form.password === form.confirmPassword ? "text-green-600" : "text-red-500"}`}>
                {form.password === form.confirmPassword ? "✅ Passwords match" : "❌ Passwords do not match"}
              </p>
            )}

            {/* Terms */}
            <p className="text-xs text-gray-400 text-center">
              By registering, you agree to our{" "}
              <a href="#" className="text-green-600 hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-green-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
            >
              {loading
                ? <><FaSpinner className="animate-spin" /> Creating Account...</>
                : "Create My Account 🌿"
              }
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-bold hover:text-green-700">Login here</Link>
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-gray-500">
          <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
            <p className="text-lg mb-1">🆓</p>
            <p>100% Free</p>
          </div>
          <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
            <p className="text-lg mb-1">🔒</p>
            <p>Secure & Private</p>
          </div>
          <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
            <p className="text-lg mb-1">🌐</p>
            <p>Hindi / Marathi</p>
          </div>
        </div>
      </div>
    </div>
  );
}
