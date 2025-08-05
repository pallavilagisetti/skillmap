const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const pdfParse = require("pdf-parse");
const OpenAI = require("openai");

if (!process.env.OPENAI_API_KEY) {
  throw new Error("❌ OPENAI_API_KEY is missing. Check your .env file.");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const jobSkills = ["React", "Node.js", "JavaScript", "HTML", "CSS", "Git", "REST API"];

exports.analyzeResume = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfData = await pdfParse(fs.readFileSync(file.path));
    const resumeText = pdfData.text;

    // 🔍 Basic skill matching
    const extractedSkills = extractSkillsFromText(resumeText);

    const matchedSkills = extractedSkills.filter((skill) =>
      jobSkills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())
    );
    const missingSkills = jobSkills.filter(
      (jobSkill) =>
        !extractedSkills.map((s) => s.toLowerCase()).includes(jobSkill.toLowerCase())
    );

    // 🧠 Additional metadata extraction
    const candidateName = extractCandidateName(resumeText);
    const yearsOfExperience = extractYearsOfExperience(resumeText);
    const topSkills = extractedSkills.slice(0, 3); // Simply take first 3 for now

    res.json({
      candidateName,
      topSkills,
      yearsOfExperience,
      extractedSkills,
      matchedSkills,
      missingSkills,
    });
  } catch (error) {
    console.error("❌ Resume analysis failed:", error);
    res.status(500).json({ error: "Resume analysis failed" });
  }
};

// 🔍 Skill extractor (case-insensitive)
function extractSkillsFromText(text) {
  const possibleSkills = ["React", "Node.js", "JavaScript", "HTML", "CSS", "Git", "REST API"];
  const lowerText = text.toLowerCase();
  return possibleSkills.filter((skill) => lowerText.includes(skill.toLowerCase()));
}

// 🧠 Naive name extractor: picks first non-empty line
function extractCandidateName(text) {
  const lines = text.split("\n").map(line => line.trim()).filter(Boolean);
  return lines[0] || "Unknown Candidate";
}

// 🧠 Naive experience extractor using regex
function extractYearsOfExperience(text) {
  const regex = /(\d+)\+?\s+years? of experience/i;
  const match = text.match(regex);
  return match ? parseInt(match[1], 10) : "Not specified";
}
