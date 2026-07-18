const express = require("express");
const router = express.Router();

// Temporary API

router.post("/analyze", async (req, res) => {
  console.log("===== ANALYZE REQUEST =====");
  console.log(req.body);

  try {
    const { resumeText, jobDescription } = req.body;

    return res.status(200).json({
      success: true,
      analysis: {
        score: 85,
        skills: ["JavaScript", "React", "Node.js"],
        strengths: ["Good Projects"],
        weaknesses: ["Improve Resume"],
        recommendations: ["Learn Docker"]
      }
    });
  } catch (err) {
    console.error("ANALYZE ERROR:", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;