const axios = require("axios");

exports.analyzeResume = async (req, res) => {
  try {
    const resumeText = req.body.resumeText;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an AI career advisor.",
          },
          {
            role: "user",
            content: `
Analyze this resume and provide:
1. Resume Score
2. Skills
3. Strengths
4. Weaknesses
5. Career Recommendations
6. Interview Questions

Resume:
${resumeText}
            `,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      success: true,
      analysis: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "AI analysis failed",
    });
  }
};