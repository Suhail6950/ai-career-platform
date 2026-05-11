const express = require("express");

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {

    const { resumeText, jobDescription } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Resume text is required",
      });
    }

    let score = 60;

    let matchScore = 50;

    if (jobDescription) {

      if (
        jobDescription.toLowerCase().includes("react") &&
        resumeText.toLowerCase().includes("react")
      ) {
        matchScore += 10;
      }

      if (
        jobDescription.toLowerCase().includes("node") &&
        resumeText.toLowerCase().includes("node")
      ) {
        matchScore += 10;
      }

      if (
        jobDescription.toLowerCase().includes("mongodb") &&
        resumeText.toLowerCase().includes("mongodb")
      ) {
        matchScore += 10;
      }

      if (
        jobDescription.toLowerCase().includes("python") &&
        resumeText.toLowerCase().includes("python")
      ) {
        matchScore += 10;
      }

    }

    if (
      resumeText.toLowerCase().includes("react")
    ) {
      score += 10;
    }

    if (
      resumeText.toLowerCase().includes("node")
    ) {
      score += 10;
    }

    if (
      resumeText.toLowerCase().includes("mongodb")
    ) {
      score += 10;
    }

    if (
      resumeText.toLowerCase().includes("python")
    ) {
      score += 5;
    }

    const analysis = {

      matchScore,

      score,

      skills: [
        resumeText.includes("React") && "React.js",
        resumeText.includes("Node") && "Node.js",
        resumeText.includes("MongoDB") && "MongoDB",
        resumeText.includes("Python") && "Python",
      ].filter(Boolean),

      strengths: [
        "Technical background detected",
        "Good project structure",
        "Learning potential identified",
      ],

      weaknesses: [
        "Improve DSA skills",
        "Add more deployed projects",
        "Add certifications",
      ],

      recommendations: [
        "Frontend Developer",
        "Full Stack Developer",
        "Software Engineer",
      ],

      questions: [
        "Explain your latest project.",
        "What is React?",
        "Explain APIs.",
        "What is MongoDB?",
        "Explain authentication.",
      ],
    };

    res.json({
      success: true,
      analysis,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
});

module.exports = router;