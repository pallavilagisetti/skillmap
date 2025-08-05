import React, { useState } from "react";

// These are the required skills for a sample job
const jobSkills = ["React", "Node.js", "JavaScript", "HTML", "CSS", "Git", "REST API"];

export default function SkillGapAnalyzer({ extractedSkills = [] }) {
  const [showResults, setShowResults] = useState(false);
  const [matched, setMatched] = useState([]);
  const [missing, setMissing] = useState([]);

  const handleSkillGapStatus = () => {
    const matchedSkills = extractedSkills.filter(skill =>
      jobSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
    );

    const missingSkills = jobSkills.filter(jobSkill =>
      !extractedSkills.map(s => s.toLowerCase()).includes(jobSkill.toLowerCase())
    );

    setMatched(matchedSkills);
    setMissing(missingSkills);
    setShowResults(true);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">3. Identify Skill Gaps</h2>

      <button
        onClick={handleSkillGapStatus}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Status of Skill Gap
      </button>

      {showResults && (
        <>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700">✅ Matched Skills:</h3>
            <ul className="list-disc list-inside text-green-700">
              {matched.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-gray-700">❌ Missing Skills:</h3>
            <ul className="list-disc list-inside text-red-700">
              {missing.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
