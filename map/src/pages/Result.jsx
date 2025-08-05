import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SkillGapAnalyzer from "../components/SkillGapAnalyzer";

function Result() {
  const { state } = useLocation();

  // Fallback to localStorage if page is refreshed
  const storedData = JSON.parse(localStorage.getItem("resumeAnalysisData") || "{}");

  // Use state if available, otherwise use storedData
  const {
    candidateName,
    yearsOfExperience,
    topSkills = [],
    extractedSkills = [],
    matchedSkills = [],
    missingSkills = [],
  } = state || storedData || {};

  // Combine skills for SkillGapAnalyzer
  const combinedSkills = [...(extractedSkills || []), ...(topSkills || [])];

  const [showGap, setShowGap] = useState(false);

  // Log for debugging
  console.log("Candidate Name:", candidateName);
  console.log("Years of Experience:", yearsOfExperience);
  console.log("Extracted Skills:", extractedSkills);
  console.log("Matched Skills:", matchedSkills);
  console.log("Missing Skills:", missingSkills);

  // If no resume data found
  if (!candidateName && extractedSkills.length === 0) {
    return (
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg mt-10">
        <p>Please upload a resume first.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">Resume Analysis Result</h2>

      <p>
        <strong>Candidate Name:</strong> {candidateName || "N/A"}
      </p>
      <p>
        <strong>Years of Experience:</strong> {yearsOfExperience || "N/A"}
      </p>

      <div className="mb-6 mt-4">
        <h3 className="font-semibold">Extracted Skills:</h3>
        <ul className="list-disc list-inside text-blue-700">
          {extractedSkills.length > 0
            ? extractedSkills.map((skill, i) => <li key={i}>{skill}</li>)
            : <li>None</li>}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold">Top Skills You Entered:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {topSkills.length > 0
            ? topSkills.map((skill, i) => <li key={i}>{skill}</li>)
            : <li>None provided</li>}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold">Matched Skills:</h3>
        <ul className="list-disc list-inside text-green-700">
          {matchedSkills.length > 0
            ? matchedSkills.map((skill, i) => <li key={i}>{skill}</li>)
            : <li>None</li>}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold">Missing Skills:</h3>
        <ul className="list-disc list-inside text-red-700">
          {missingSkills.length > 0
            ? missingSkills.map((skill, i) => <li key={i}>{skill}</li>)
            : <li>None</li>}
        </ul>
      </div>

      <button
        onClick={() => setShowGap(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Status of Skill Gap
      </button>

      {showGap && (
        <div className="mt-6">
          <SkillGapAnalyzer extractedSkills={combinedSkills} />
        </div>
      )}
    </div>
  );
}

export default Result;
