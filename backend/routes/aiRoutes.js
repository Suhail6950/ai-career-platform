const express = require("express");
const router = express.Router();

// Temporary API

router.post("/analyze", async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    res.json({
      success: true,
      analysis: {
        score: 85,
        skills: [
          "JavaScript",
          "React",
          "Node.js",
          "Express",
          "MongoDB"
        ],
        strengths: [
          "Good technical skills",
          "Relevant projects"
        ],
        weaknesses: [
          "Add certifications",
          "Improve resume formatting"
        ],
        recommendations: [
          "Learn Docker",
          "Practice DSA",
          "Improve SQL"
        ]
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;