import React, { useState, useRef } from "react";
import { FaUpload, FaCamera, FaSeedling, FaSpinner, FaExclamationTriangle, FaCheckCircle, FaLeaf } from "react-icons/fa";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function DiseaseDetector() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("image", image);
      const res = await axios.post(`${API_BASE}/api/disease/detect`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      setError("Could not analyze the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const severityColor = (severity) => {
    if (!severity) return "gray";
    const s = severity.toLowerCase();
    if (s.includes("high") || s.includes("severe")) return "red";
    if (s.includes("medium") || s.includes("moderate")) return "yellow";
    return "green";
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
          <FaSeedling className="text-3xl text-green-600" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-3">Crop Disease Detector</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Upload a photo of your crop leaf. Our AI will instantly identify the disease and suggest treatment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Area */}
        <div>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileRef.current.click()}
            className="border-2 border-dashed border-green-300 rounded-2xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all min-h-[280px] flex flex-col items-center justify-center"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-60 rounded-xl object-contain" />
            ) : (
              <>
                <FaUpload className="text-5xl text-green-300 mb-4" />
                <p className="text-gray-600 font-medium mb-1">Drag & drop or click to upload</p>
                <p className="text-gray-400 text-sm">Supports JPG, PNG, WEBP</p>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => fileRef.current.click()}
              className="flex-1 flex items-center justify-center gap-2 border border-green-300 text-green-700 py-3 rounded-xl font-medium hover:bg-green-50 transition-all"
            >
              <FaCamera /> Choose Photo
            </button>
            <button
              onClick={handleAnalyze}
              disabled={!image || loading}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><FaSpinner className="animate-spin" /> Analyzing...</>
              ) : (
                <><FaLeaf /> Analyze</>
              )}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 mt-4">
              <FaExclamationTriangle /> {error}
            </div>
          )}
        </div>

        {/* Results */}
        <div>
          {result ? (
            <div className="space-y-4">
              {/* Disease Name */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Detected Disease</p>
                <h2 className="text-2xl font-black text-gray-900">{result.disease || "Healthy Crop"}</h2>
                <div className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-sm font-medium
                  ${severityColor(result.severity) === "red" ? "bg-red-100 text-red-700" :
                    severityColor(result.severity) === "yellow" ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"}`}>
                  {severityColor(result.severity) === "green" ? <FaCheckCircle /> : <FaExclamationTriangle />}
                  Severity: {result.severity || "Low"}
                </div>
              </div>

              {/* Description */}
              {result.description && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                  <p className="text-xs text-blue-500 font-medium uppercase tracking-wider mb-2">About This Disease</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{result.description}</p>
                </div>
              )}

              {/* Treatment */}
              {result.treatment && (
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                  <p className="text-xs text-green-600 font-medium uppercase tracking-wider mb-2">Recommended Treatment</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{result.treatment}</p>
                </div>
              )}

              {/* Pesticide */}
              {result.pesticide && (
                <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5">
                  <p className="text-xs text-yellow-600 font-medium uppercase tracking-wider mb-2">Suggested Pesticide</p>
                  <p className="text-gray-700 text-sm font-medium">{result.pesticide}</p>
                </div>
              )}

              {/* Prevention */}
              {result.prevention && (
                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">
                  <p className="text-xs text-purple-600 font-medium uppercase tracking-wider mb-2">Prevention Tips</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{result.prevention}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full min-h-[280px] flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-gray-200 text-center p-8">
              <FaSeedling className="text-5xl text-gray-300 mb-4" />
              <p className="text-gray-400 font-medium">Upload an image to see the analysis results here</p>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-12 bg-green-50 border border-green-100 rounded-2xl p-6">
        <h3 className="font-bold text-green-800 mb-3">📸 Tips for Best Results</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-green-700">
          <p>✅ Take photo in good daylight</p>
          <p>✅ Focus on the affected leaf area</p>
          <p>✅ Avoid blurry or dark images</p>
        </div>
      </div>
    </div>
  );
}
