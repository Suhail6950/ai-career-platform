const multer = require("multer");
const pdfParse = require("pdf-parse");

const storage = multer.memoryStorage();

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

const analyzeResume = async (req, res) => {

  try {

    const { resumeText } = req.body;

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
  upload,
  uploadResume,
  analyzeResume,
};