const express = require("express");

const router = express.Router();

const {
  upload,
  uploadResume,
  analyzeResume,
} = require("../controllers/resumeController");

router.post(
  "/upload",
  upload.single("resume"),
  uploadResume
);

router.post(
  "/analyze",
  analyzeResume
);

module.exports = router;