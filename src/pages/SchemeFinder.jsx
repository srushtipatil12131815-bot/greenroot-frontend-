import React, { useState } from "react";
import { FaFileAlt, FaSearch, FaExternalLinkAlt, FaCheckCircle, FaRupeeSign, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const states = ["Maharashtra", "Punjab", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan", "Gujarat", "Karnataka", "Andhra Pradesh", "West Bengal", "Bihar"];
const landSizes = ["Less than 1 acre", "1-2 acres", "2-5 acres", "5-10 acres", "More than 10 acres"];
const cropTypes = ["Kharif (Monsoon)", "Rabi (Winter)", "Zaid (Summer)", "Horticulture", "Mixed Farming"];
const incomeRanges = ["Below ₹1 lakh", "₹1-2 lakh", "₹2-5 lakh", "Above ₹5 lakh"];

const categoryColors = {
  subsidy: "bg-green-100 text-green-700 border-green-200",
  insurance: "bg-blue-100 text-blue-700 border-blue-200",
  loan: "bg-purple-100 text-purple-700 border-purple-200",
  direct: "bg-orange-100 text-orange-700 border-orange-200",
};

export default function SchemeFinder() {
  const [form, setForm] = useState({ state: "", land: "", crop: "", income: "" });
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSearch = async () => {
    if (!form.state || !form.land) return;
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const res = await axios.post(`${API_BASE}/api/schemes`, form);
      setSchemes(res.data.schemes || []);
    } catch {
      setError("Could not fetch schemes. Please try again.");
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
          <FaFileAlt className="text-3xl text-purple-500" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-3">Government Scheme Finder</h1>
        <p className="text-gray-500 text-lg">Find all schemes you're eligible for in 30 seconds</p>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="font-bold text-gray-900 mb-4">Enter Your Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block uppercase tracking-wide">State *</label>
            <select name="state" value={form.state} onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 bg-white">
              <option value="">Select state</option>
              {states.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block uppercase tracking-wide">Land Size *</label>
            <select name="land" value={form.land} onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 bg-white">
              <option value="">Select land size</option>
              {landSizes.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block uppercase tracking-wide">Crop Type</label>
            <select name="crop" value={form.crop} onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 bg-white">
              <option value="">Select crop type</option>
              {cropTypes.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block uppercase tracking-wide">Annual Income</label>
            <select name="income" value={form.income} onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 bg-white">
              <option value="">Select income range</option>
              {incomeRanges.map(i => <option key={i}>{i}</option>)}
            </select>
          </div>
        </div>
        <button
          onClick={handleSearch}
          disabled={!form.state || !form.land || loading}
          className="w-full mt-5 flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-all disabled:opacity-50"
        >
          <FaSearch /> {loading ? "Finding Schemes..." : "Find My Schemes"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 text-sm">{error}</div>
      )}

      {/* Results */}
      {schemes.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaCheckCircle className="text-green-500" />
            <h2 className="text-xl font-bold text-gray-900">
              {schemes.length} schemes found for you!
            </h2>
          </div>
          <div className="space-y-4">
            {schemes.map((s, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{s.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${categoryColors[s.category] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                        {s.category}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {s.benefit && (
                        <div className="flex items-center gap-2 text-sm">
                          <FaRupeeSign className="text-green-500 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-400">Benefit</p>
                            <p className="font-medium text-gray-700">{s.benefit}</p>
                          </div>
                        </div>
                      )}
                      {s.deadline && (
                        <div className="flex items-center gap-2 text-sm">
                          <FaCalendarAlt className="text-orange-500 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-400">Deadline</p>
                            <p className="font-medium text-gray-700">{s.deadline}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {s.applyLink && (
                    <a
                      href={s.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 flex items-center gap-1.5 bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-700 transition-all"
                    >
                      Apply <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searched && schemes.length === 0 && !loading && !error && (
        <div className="text-center py-12 text-gray-400">
          <FaFileAlt className="text-5xl mx-auto mb-3 text-gray-300" />
          <p>No schemes found for these criteria. Try different inputs.</p>
        </div>
      )}

      {/* Popular Schemes Info */}
      {!searched && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: "PM-KISAN", desc: "₹6,000/year direct income support", color: "bg-orange-50 border-orange-200" },
            { name: "Pradhan Mantri Fasal Bima Yojana", desc: "Crop insurance at 2% premium", color: "bg-blue-50 border-blue-200" },
            { name: "Kisan Credit Card", desc: "Low-interest crop loans up to ₹3 lakh", color: "bg-purple-50 border-purple-200" },
            { name: "Soil Health Card", desc: "Free soil testing and fertilizer advice", color: "bg-green-50 border-green-200" },
          ].map((s, i) => (
            <div key={i} className={`border rounded-2xl p-5 ${s.color}`}>
              <p className="font-bold text-gray-900 mb-1">{s.name}</p>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
