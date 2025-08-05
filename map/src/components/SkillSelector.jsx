import { useState } from "react";
import React from 'react';


export default function SkillSelector() {
  const [inputValue, setInputValue] = useState("");
  const [skills, setSkills] = useState([]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    const newSkill = inputValue.trim();
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
    }
    setInputValue("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">2. Enter Your Top Skills</h2>

      <form onSubmit={handleAddSkill} className="flex gap-2">
        <input
          type="text"
          placeholder="Type a skill and press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {skill}
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
