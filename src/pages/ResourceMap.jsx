import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaHospital, FaTractor, FaSeedling, FaTint, FaStore, FaSpinner, FaPhone } from "react-icons/fa";

const resourceTypes = [
  { key: "hospital", label: "Hospitals", icon: <FaHospital />, color: "text-red-500", bg: "bg-red-50", border: "border-red-200" },
  { key: "krishi", label: "Krishi Kendra", icon: <FaTractor />, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
  { key: "seed", label: "Seed Shops", icon: <FaSeedling />, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
  { key: "water", label: "Water Sources", icon: <FaTint />, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
  { key: "market", label: "Markets", icon: <FaStore />, color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200" },
];

// Mock data for demo
const mockResources = {
  hospital: [
    { name: "District Civil Hospital", address: "Civil Lines, Nashik", distance: "2.3 km", phone: "0253-2315000", open: true },
    { name: "Primary Health Centre", address: "Ozar Road, Nashik", distance: "4.1 km", phone: "0253-2223344", open: true },
  ],
  krishi: [
    { name: "Krishi Vigyan Kendra", address: "Agri College Road, Pune", distance: "1.8 km", phone: "020-25536209", open: true },
    { name: "Agricultural Produce Market", address: "Market Yard, Pune", distance: "3.2 km", phone: "020-24261402", open: false },
  ],
  seed: [
    { name: "Mahindra AgriTech Store", address: "Main Bazaar, Nashik", distance: "0.9 km", phone: "9876543210", open: true },
    { name: "Rallis India Seed Center", address: "Near Bus Stand", distance: "2.1 km", phone: "9876543211", open: true },
  ],
  water: [
    { name: "Gangapur Dam Irrigation", address: "Gangapur, Nashik", distance: "5.2 km", phone: "0253-2312345", open: true },
    { name: "Bore Well Authority", address: "Taluka Office", distance: "1.5 km", phone: "0253-2234567", open: false },
  ],
  market: [
    { name: "APMC Market Yard", address: "Market Yard Road", distance: "3.0 km", phone: "020-24261403", open: true },
    { name: "Weekly Bazar", address: "Village Chowk", distance: "1.2 km", phone: "", open: true },
  ],
};

export default function ResourceMap() {
  const [selected, setSelected] = useState("hospital");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState([]);

  const handleGetLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setResources(mockResources[selected]);
        setLoading(false);
      },
      () => {
        setResources(mockResources[selected]);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (location) setResources(mockResources[selected] || []);
  }, [selected, location]);

  const active = resourceTypes.find(r => r.key === selected);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
          <FaMapMarkerAlt className="text-3xl text-red-500" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-3">Nearby Resources</h1>
        <p className="text-gray-500 text-lg">Find hospitals, Krishi Kendras, seed shops and more near you</p>
      </div>

      {/* Location Button */}
      {!location && (
        <div className="text-center mb-8">
          <button
            onClick={handleGetLocation}
            disabled={loading}
            className="flex items-center gap-2 mx-auto bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaMapMarkerAlt />}
            {loading ? "Getting Location..." : "Use My Location"}
          </button>
          <p className="text-gray-400 text-sm mt-3">We'll show resources near your farm</p>
        </div>
      )}

      {/* Resource Type Filter */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {resourceTypes.map((r) => (
          <button
            key={r.key}
            onClick={() => {
              setSelected(r.key);
              if (!location) {
                setResources(mockResources[r.key]);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all
              ${selected === r.key ? `${r.bg} ${r.color} ${r.border}` : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}
          >
            {r.icon} {r.label}
          </button>
        ))}
      </div>

      {/* Map Placeholder */}
      <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl h-56 mb-6 flex items-center justify-center border border-green-300 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute w-px bg-green-400" style={{ left: `${i * 10 + 5}%`, top: 0, bottom: 0 }} />
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute h-px bg-green-400" style={{ top: `${i * 16 + 8}%`, left: 0, right: 0 }} />
          ))}
        </div>
        <div className="text-center z-10">
          <FaMapMarkerAlt className="text-5xl text-green-600 mx-auto mb-2" />
          <p className="text-green-800 font-bold">Interactive Map</p>
          <p className="text-green-600 text-sm">Integrate Google Maps / Leaflet API</p>
        </div>
      </div>

      {/* Resources List */}
      {(resources.length > 0 || !location) && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className={active?.color}>{active?.icon}</span>
            Nearby {active?.label}
            {!location && <span className="text-sm font-normal text-gray-400 ml-2">(Demo data)</span>}
          </h2>
          <div className="space-y-3">
            {(resources.length > 0 ? resources : mockResources[selected]).map((r, i) => (
              <div key={i} className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all ${active?.border}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${active?.bg}`}>
                      <span className={active?.color}>{active?.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-gray-900">{r.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                          {r.open ? "Open" : "Closed"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <FaMapMarkerAlt className="text-xs" /> {r.address}
                      </p>
                      {r.phone && (
                        <p className="text-sm text-blue-600 flex items-center gap-1 mt-1">
                          <FaPhone className="text-xs" /> {r.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-gray-900">{r.distance}</p>
                    <p className="text-xs text-gray-400">away</p>
                    <button className="mt-2 text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-all">
                      Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Numbers */}
      <div className="mt-10 bg-red-50 border border-red-200 rounded-2xl p-6">
        <h3 className="font-bold text-red-800 mb-4">🆘 Emergency Helplines</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          {[
            { label: "Kisan Helpline", num: "1800-180-1551" },
            { label: "Medical Emergency", num: "108" },
            { label: "Police", num: "100" },
            { label: "Disaster Mgmt", num: "1078" },
          ].map((e, i) => (
            <div key={i} className="text-center">
              <p className="text-gray-500 text-xs">{e.label}</p>
              <p className="text-red-700 font-black text-lg">{e.num}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
