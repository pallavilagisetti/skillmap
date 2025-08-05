import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [resumeFile, setResumeFile] = useState(null);
  const [topSkills, setTopSkills] = useState('');
  const navigate = useNavigate();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('resume', resumeFile);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData);
      const { extractedSkills, matchedSkills, missingSkills } = response.data;

      const userTopSkills = topSkills.split(',').map(skill => skill.trim()).filter(Boolean);
      const combinedSkills = [...new Set([...extractedSkills, ...userTopSkills])];

      navigate('/result', {
        state: {
          extractedSkills,
          userTopSkills,
          matchedSkills,
          missingSkills,
          combinedSkills
        },
      });
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Upload Resume</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResumeFile(e.target.files[0])}
        className="mb-4"
      />

      <textarea
        placeholder="Optional: Enter your top skills separated by commas"
        value={topSkills}
        onChange={(e) => setTopSkills(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        rows={3}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload & Analyze
      </button>
    </div>
  );
}

export default Home;
