import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaTachometerAlt, FaPlus, FaLeaf, FaRupeeSign, FaCalendarAlt,
  FaBell, FaChartLine, FaTrash, FaSeedling, FaTimes
} from "react-icons/fa";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const cropOptions = ["Wheat", "Rice", "Cotton", "Soybean", "Onion", "Tomato", "Potato", "Sugarcane", "Maize", "Jowar"];
const seasons = ["Kharif (Jun-Oct)", "Rabi (Nov-Apr)", "Zaid (Mar-Jun)"];

export default function Dashboard() {
  const { user, token } = useAuth();
  const [crops, setCrops] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ crop: "", season: "", area: "", expense: "", expectedYield: "", sowDate: "" });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const [cropsRes, remindersRes] = await Promise.all([
        axios.get(`${API_BASE}/api/dashboard/crops`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE}/api/dashboard/reminders`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setCrops(cropsRes.data || []);
      setReminders(remindersRes.data || []);
    } catch {
      // Fallback to mock data for demo
      setCrops([
        { _id: "1", crop: "Wheat", season: "Rabi (Nov-Apr)", area: "3", expense: "12000", expectedYield: "45", sowDate: "2024-11-15", status: "Growing" },
        { _id: "2", crop: "Onion", season: "Kharif (Jun-Oct)", area: "1.5", expense: "8000", expectedYield: "20", sowDate: "2024-06-20", status: "Harvested" },
      ]);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAddCrop = async () => {
    if (!form.crop || !form.season) return;
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/dashboard/crops`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      setForm({ crop: "", season: "", area: "", expense: "", expectedYield: "", sowDate: "" });
      fetchData();
    } catch {
      setCrops(prev => [...prev, { ...form, _id: Date.now().toString(), status: "Growing" }]);
      setShowModal(false);
    } finally {
      setLoading(false);
    }
  };

  const totalExpense = crops.reduce((sum, c) => sum + (Number(c.expense) || 0), 0);
  const totalArea = crops.reduce((sum, c) => sum + (Number(c.area) || 0), 0);

  const statusColor = (s) => {
    if (!s) return "bg-gray-100 text-gray-600";
    if (s.toLowerCase() === "growing") return "bg-green-100 text-green-700";
    if (s.toLowerCase() === "harvested") return "bg-blue-100 text-blue-700";
    if (s.toLowerCase() === "failed") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Farm Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {user?.name || "Farmer"} 👋</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md"
        >
          <FaPlus /> Add Crop
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Crops", value: crops.length, icon: <FaLeaf />, color: "text-green-600", bg: "bg-green-50" },
          { label: "Total Area", value: `${totalArea} acres`, icon: <FaSeedling />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Expense", value: `₹${totalExpense.toLocaleString()}`, icon: <FaRupeeSign />, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Reminders", value: reminders.length || 3, icon: <FaBell />, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center ${s.color} mb-3`}>
              {s.icon}
            </div>
            <p className="text-2xl font-black text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crops List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaChartLine className="text-green-500" /> My Crops
            </h2>
          </div>
          {crops.length > 0 ? (
            <div className="space-y-3">
              {crops.map((c, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <FaLeaf className="text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-gray-900">{c.crop}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(c.status)}`}>
                            {c.status || "Active"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{c.season}</p>
                      </div>
                    </div>
                    <button className="text-gray-300 hover:text-red-400 transition-colors">
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-gray-100 text-sm">
                    <div>
                      <p className="text-gray-400 text-xs">Area</p>
                      <p className="font-medium">{c.area} acres</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Expense</p>
                      <p className="font-medium">₹{Number(c.expense).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Expected Yield</p>
                      <p className="font-medium">{c.expectedYield} qtl</p>
                    </div>
                  </div>
                  {c.sowDate && (
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                      <FaCalendarAlt /> Sown: {new Date(c.sowDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-12 text-center">
              <FaSeedling className="text-5xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 font-medium">No crops added yet. Click "Add Crop" to start tracking.</p>
            </div>
          )}
        </div>

        {/* Reminders & Tips */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FaBell className="text-purple-500" /> Reminders
          </h2>
          {[
            { text: "Apply fertilizer to wheat crop", date: "Tomorrow", color: "bg-orange-50 border-orange-200" },
            { text: "Irrigation scheduled for tomatoes", date: "In 2 days", color: "bg-blue-50 border-blue-200" },
            { text: "Harvest onion crop — market prices are high!", date: "This week", color: "bg-green-50 border-green-200" },
          ].map((r, i) => (
            <div key={i} className={`border rounded-2xl p-4 ${r.color}`}>
              <p className="text-sm font-medium text-gray-800">{r.text}</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <FaCalendarAlt /> {r.date}
              </p>
            </div>
          ))}

          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mt-6">
            <FaLeaf className="text-green-500" /> Seasonal Tips
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 space-y-2 text-sm text-green-800">
            <p>🌱 Monsoon season — good time for Kharif crops</p>
            <p>💧 Check irrigation systems before dry months</p>
            <p>🐛 Watch for pests after heavy rainfall</p>
            <p>📋 Apply for PM-KISAN before deadline</p>
          </div>
        </div>
      </div>

      {/* Add Crop Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">Add New Crop</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">Crop *</label>
                <select value={form.crop} onChange={e => setForm({ ...form, crop: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400 bg-white">
                  <option value="">Select crop</option>
                  {cropOptions.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">Season *</label>
                <select value={form.season} onChange={e => setForm({ ...form, season: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400 bg-white">
                  <option value="">Select season</option>
                  {seasons.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">Area (acres)</label>
                  <input type="number" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })}
                    placeholder="e.g. 2.5"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">Expense (₹)</label>
                  <input type="number" value={form.expense} onChange={e => setForm({ ...form, expense: e.target.value })}
                    placeholder="e.g. 15000"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">Expected Yield (qtl)</label>
                  <input type="number" value={form.expectedYield} onChange={e => setForm({ ...form, expectedYield: e.target.value })}
                    placeholder="e.g. 40"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">Sow Date</label>
                  <input type="date" value={form.sowDate} onChange={e => setForm({ ...form, sowDate: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400" />
                </div>
              </div>
              <button
                onClick={handleAddCrop}
                disabled={!form.crop || !form.season || loading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all disabled:opacity-50 mt-2"
              >
                {loading ? "Adding..." : "Add Crop"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
