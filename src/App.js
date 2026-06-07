import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import Landing from "./pages/Landing";
import DiseaseDetector from "./pages/DiseaseDetector";
import AIChat from "./pages/AIChat";
import Weather from "./pages/Weather";
import MandiPrices from "./pages/MandiPrices";
import SchemeFinder from "./pages/SchemeFinder";
import ResourceMap from "./pages/ResourceMap";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#f0fdf4]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/disease-detector" element={<DiseaseDetector />} />
              <Route path="/ai-chat" element={<AIChat />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/mandi-prices" element={<MandiPrices />} />
              <Route path="/scheme-finder" element={<SchemeFinder />} />
              <Route path="/resource-map" element={<ResourceMap />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
