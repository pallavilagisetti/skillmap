import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("⚠️ Please select a PDF file before uploading.");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("❌ Only PDF files are allowed.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch(https://skillmap-1.onrender.com/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("Backend response:", data);

      // Save data to localStorage for persistence on refresh
      localStorage.setItem("resumeAnalysisData", JSON.stringify(data));

      navigate("/result", { state: data });
    } catch (err) {
      console.error("Upload error:", err);
      setError("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>

      <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-4 block w-full" />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>

      {error && (
        <div className="mt-4 p-3 border border-red-500 bg-red-100 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
