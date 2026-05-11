const fs = require("fs");

const pdf = require("pdf-parse");

const uploadResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    let extractedText = "";

    if (
      req.file.mimetype === "application/pdf"
    ) {

      const dataBuffer = fs.readFileSync(
        req.file.path
      );

      const data = await pdf(dataBuffer);

      extractedText = data.text;

    } else {

      extractedText =
        "Only PDF extraction supported";
    }

    res.status(200).json({
      message: "Resume uploaded successfully",
      extractedText,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  uploadResume,
};