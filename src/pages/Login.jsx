import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLeaf, FaEnvelope, FaLock, FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, form);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
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
          <h1 className="text-3xl font-black text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-1">Login to your GreenRoot account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-4 mb-6">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium">Forgot password?</a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-green-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
            >
              {loading ? <><FaSpinner className="animate-spin" /> Logging in...</> : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-600 font-bold hover:text-green-700">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
