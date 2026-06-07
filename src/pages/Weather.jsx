import React, { useState, useEffect } from "react";
import { FaCloudSun, FaMapMarkerAlt, FaSpinner, FaTint, FaWind, FaThermometerHalf, FaSeedling } from "react-icons/fa";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const weatherIcons = {
  Clear: "☀️", Clouds: "☁️", Rain: "🌧️", Drizzle: "🌦️",
  Thunderstorm: "⛈️", Snow: "❄️", Mist: "🌫️", Haze: "🌫️"
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE}/api/weather?city=${cityName}`);
      setWeather(res.data.current);
      setForecast(res.data.forecast || []);
    } catch {
      setError("Could not fetch weather. Check city name and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE}/api/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
        );
        setWeather(res.data.current);
        setForecast(res.data.forecast || []);
        setCity(res.data.current?.city || "Your Location");
      } catch {
        setError("Could not fetch weather for your location.");
      } finally {
        setLoading(false);
      }
    });
  };

  const farmingTip = (condition) => {
    if (!condition) return "";
    const c = condition.toLowerCase();
    if (c.includes("rain")) return "🌧️ Good time to water crops naturally. Avoid pesticide application today.";
    if (c.includes("clear")) return "☀️ Ideal for sowing and harvesting. Apply pesticides in the morning.";
    if (c.includes("cloud")) return "☁️ Moderate conditions. Good for transplanting seedlings.";
    if (c.includes("storm")) return "⛈️ Protect your crops. Secure loose equipment and drains.";
    return "🌾 Monitor crops regularly and follow seasonal guidelines.";
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-2xl mb-4">
          <FaCloudSun className="text-3xl text-yellow-500" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-3">Weather Dashboard</h1>
        <p className="text-gray-500 text-lg">Get hyper-local weather with farming recommendations</p>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather(searchCity)}
          placeholder="Enter city or village name..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400 transition-all"
        />
        <button
          onClick={() => fetchWeather(searchCity)}
          disabled={!searchCity || loading}
          className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-yellow-600 transition-all disabled:opacity-50"
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Search"}
        </button>
        <button
          onClick={handleLocation}
          className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 px-5 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all"
        >
          <FaMapMarkerAlt /> Use My Location
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 text-sm">{error}</div>
      )}

      {weather && (
        <>
          {/* Current Weather */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl p-8 text-white mb-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-1 flex items-center gap-1">
                  <FaMapMarkerAlt /> {weather.city}, {weather.country}
                </p>
                <p className="text-7xl font-black mb-2">{Math.round(weather.temp)}°C</p>
                <p className="text-xl font-semibold">{weather.description}</p>
              </div>
              <p className="text-7xl">{weatherIcons[weather.main] || "🌤️"}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 border-t border-yellow-300 pt-4">
              <div className="flex items-center gap-2">
                <FaTint className="text-yellow-200" />
                <div>
                  <p className="text-yellow-100 text-xs">Humidity</p>
                  <p className="font-bold">{weather.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaWind className="text-yellow-200" />
                <div>
                  <p className="text-yellow-100 text-xs">Wind</p>
                  <p className="font-bold">{weather.wind} km/h</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaThermometerHalf className="text-yellow-200" />
                <div>
                  <p className="text-yellow-100 text-xs">Feels Like</p>
                  <p className="font-bold">{Math.round(weather.feels_like)}°C</p>
                </div>
              </div>
            </div>
          </div>

          {/* Farming Tip */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6 flex items-start gap-3">
            <FaSeedling className="text-green-600 text-xl mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-green-800 mb-1">Today's Farming Recommendation</p>
              <p className="text-green-700 text-sm">{farmingTip(weather.main)}</p>
            </div>
          </div>

          {/* 7-Day Forecast */}
          {forecast.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">7-Day Forecast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {forecast.map((day, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-all">
                    <p className="text-xs font-medium text-gray-500 mb-2">
                      {days[new Date(day.date).getDay()]}
                    </p>
                    <p className="text-3xl mb-2">{weatherIcons[day.main] || "🌤️"}</p>
                    <p className="font-bold text-gray-900 text-sm">{Math.round(day.max)}°</p>
                    <p className="text-gray-400 text-xs">{Math.round(day.min)}°</p>
                    <p className="text-xs text-blue-500 mt-1">{day.rain ? `${day.rain}mm` : ""}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!weather && !loading && (
        <div className="text-center py-16 text-gray-400">
          <FaCloudSun className="text-6xl mx-auto mb-4 text-gray-300" />
          <p className="font-medium">Search for a city or use your location to see weather</p>
        </div>
      )}
    </div>
  );
}
