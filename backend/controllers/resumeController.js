const multer = require("multer");
const pdfParse = require("pdf-parse");

const storage = multer.memoryStorage();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const upload = multer({
  storage: storage,
});

const uploadResume = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const pdfData = await pdfParse(
      req.file.buffer
    );

    res.json({
      success: true,
      extractedText: pdfData.text,
    });

  } catch (error) {

    console.log("PDF ERROR:", error);

    res.status(500).json({
      success: false,
      message: "PDF extraction failed",
    });
  }
};

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const analyzeResume = async (req, res) => {
  try {

    const { resumeText } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
Analyze this resume.

Give:

1. Resume Score out of 100
2. Skills
3. Strengths
4. Weaknesses
5. Missing Skills
6. Career Recommendations
7. Interview Questions

Resume:
${resumeText}
`;

    const result =
      await model.generateContent(prompt);

    const response =
      result.response.text();

    res.json({
      success: true,
      analysis: response,
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
  upload,
  uploadResume,
  analyzeResume,
};