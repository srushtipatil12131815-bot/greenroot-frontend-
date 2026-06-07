import React, { useState } from "react";
import { FaRupeeSign, FaSearch, FaArrowUp, FaArrowDown, FaMinus, FaWarehouse } from "react-icons/fa";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const crops = ["Wheat", "Rice", "Cotton", "Sugarcane", "Soybean", "Onion", "Tomato", "Potato", "Maize", "Jowar", "Bajra", "Tur Dal"];
const states = ["Maharashtra", "Punjab", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan", "Gujarat", "Karnataka", "Andhra Pradesh", "West Bengal", "Bihar"];

export default function MandiPrices() {
  const [crop, setCrop] = useState("");
  const [state, setState] = useState("");
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!crop || !state) return;
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const res = await axios.get(`${API_BASE}/api/mandi?crop=${crop}&state=${state}`);
      setPrices(res.data.prices || []);
    } catch {
      setError("Could not fetch mandi prices. Please try again.");
      setPrices([]);
    } finally {
      setLoading(false);
    }
  };

  const trendIcon = (trend) => {
    if (trend === "up") return <FaArrowUp className="text-green-500" />;
    if (trend === "down") return <FaArrowDown className="text-red-500" />;
    return <FaMinus className="text-gray-400" />;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
          <FaRupeeSign className="text-3xl text-orange-500" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-3">Mandi Price Tracker</h1>
        <p className="text-gray-500 text-lg">Know today's live market prices before you sell</p>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block uppercase tracking-wide">Select Crop</label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition-all bg-white"
            >
              <option value="">Choose crop...</option>
              {crops.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block uppercase tracking-wide">Select State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition-all bg-white"
            >
              <option value="">Choose state...</option>
              {states.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={!crop || !state || loading}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all disabled:opacity-50"
            >
              <FaSearch /> {loading ? "Searching..." : "Get Prices"}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 text-sm">{error}</div>
      )}

      {/* Results */}
      {prices.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {crop} prices in {state}
            </h2>
            <p className="text-sm text-gray-400">Updated: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="space-y-3">
            {prices.map((p, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <FaWarehouse className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{p.mandi}</p>
                      <p className="text-sm text-gray-500">{p.district}, {state}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      {trendIcon(p.trend)}
                      <p className="text-2xl font-black text-gray-900">₹{p.price}</p>
                    </div>
                    <p className="text-xs text-gray-400">per quintal</p>
                    {p.change && (
                      <p className={`text-xs font-medium ${p.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                        {p.trend === "up" ? "+" : ""}{p.change} from yesterday
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-3 gap-2 text-xs text-gray-500">
                  <div><span className="font-medium">Min:</span> ₹{p.min}</div>
                  <div><span className="font-medium">Max:</span> ₹{p.max}</div>
                  <div><span className="font-medium">Modal:</span> ₹{p.modal || p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searched && prices.length === 0 && !loading && !error && (
        <div className="text-center py-12 text-gray-400">
          <FaWarehouse className="text-5xl mx-auto mb-3 text-gray-300" />
          <p>No mandi prices found for this combination. Try a different crop or state.</p>
        </div>
      )}

      {!searched && (
        <div className="text-center py-12 text-gray-400">
          <FaRupeeSign className="text-6xl mx-auto mb-4 text-gray-300" />
          <p className="font-medium">Select a crop and state to see today's mandi prices</p>
        </div>
      )}

      {/* Tip */}
      <div className="mt-8 bg-orange-50 border border-orange-100 rounded-2xl p-5 text-sm text-orange-700">
        💡 <strong>Pro Tip:</strong> Compare prices across 2-3 mandis before deciding where to sell. Even ₹50-100 difference per quintal adds up significantly.
      </div>
    </div>
  );
}
