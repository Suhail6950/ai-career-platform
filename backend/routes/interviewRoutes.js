const express = require("express");

const router = express.Router();

router.post("/questions", async (req, res) => {
  try {

    const { role, difficulty } = req.body;

    let questions = [];

    if (role === "Frontend Developer") {

      questions = [
        "What is React?",
        "Explain Virtual DOM.",
        "What are React Hooks?",
        "Difference between state and props?",
        "Explain useEffect hook.",
      ];

    } else if (role === "Backend Developer") {

      questions = [
        "What is Express.js?",
        "Explain REST APIs.",
        "What is middleware?",
        "Difference between SQL and NoSQL?",
        "Explain JWT authentication.",
      ];

    } else if (role === "MERN Stack Developer") {

      questions = [
        "Explain MERN architecture.",
        "How does MongoDB work?",
        "Explain API integration.",
        "What is authentication?",
        "How does React communicate with backend?",
      ];

    } else {

      questions = [
        "Tell me about yourself.",
        "What are your strengths?",
        "Why should we hire you?",
        "Explain your projects.",
        "Where do you see yourself in 5 years?",
      ];
    }

    res.json({
      success: true,
      role,
      difficulty,
      questions,
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