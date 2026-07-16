const multer = require("multer");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded.",
      });
    }

    const pdfData = await pdfParse(req.file.buffer);

    if (!pdfData.text || pdfData.text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Unable to extract text from the PDF.",
      });
    }

    res.json({
      success: true,
      extractedText: pdfData.text,
    });
  } catch (error) {
    console.error("PDF Extraction Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to extract resume text.",
    });
  }
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription = "" } = req.body;

    if (!resumeText || resumeText.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Resume text is required.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the resume carefully.

${
jobDescription
? `Compare it with the following Job Description:

${jobDescription}`
: "No Job Description is provided. Calculate ATS score based on industry best practices."
}

Return ONLY valid JSON.

{
"resumeScore":90,
"atsScore":85,
"skills":["Skill1","Skill2"],
"strengths":["Strength1","Strength2"],
"weaknesses":["Weakness1","Weakness2"],
"missingSkills":["Skill1","Skill2"],
"recommendations":["Recommendation1","Recommendation2"],
"careerSuggestions":["Career1","Career2"],
"interviewQuestions":["Question1","Question2","Question3"]
}

Do not write explanations.
Do not use markdown.
Do not wrap JSON inside code blocks.

Resume:

${resumeText}
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text().trim();

    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();

    let analysis;

    try {
      analysis = JSON.parse(text);
    } catch (err) {
      console.error("Invalid JSON returned by Gemini:");
      console.log(text);

      return res.status(500).json({
        success: false,
        message: "Gemini returned invalid JSON.",
      });
    }

    res.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      success: false,
      message: "Resume analysis failed.",
    });
  }
};

module.exports = {
  upload,
  uploadResume,
  analyzeResume,
};