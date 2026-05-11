const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const githubRoutes = require("./routes/githubRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

const app = express();

const aiRoutes = require("./routes/aiRoutes");

connectDB();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use("/api/auth", authRoutes);

app.use("/api/resume", resumeRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/interview", interviewRoutes);

app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});