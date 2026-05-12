const analyzeResume = async (req, res) => {

  try {

    const { resumeText } = req.body;

    console.log("Resume Text:", resumeText);

    res.json({
      success: true,
      analysis: `
Resume Score: 85

Skills:
- React
- Node.js
- MongoDB

Strengths:
- Good frontend skills
- Full stack understanding

Weaknesses:
- Improve DSA

Career Recommendations:
- Full Stack Developer
- MERN Developer

Interview Questions:
1. Explain React Hooks
2. What is JWT?
3. Explain MongoDB
      `,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Analysis failed",
    });
  }
};

module.exports = {
  analyzeResume,
};