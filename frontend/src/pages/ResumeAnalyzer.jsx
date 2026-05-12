import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const ResumeAnalyzer = () => {

  const [file, setFile] = useState(null);

  const [analysis, setAnalysis] = useState(null);

  const [jobDescription, setJobDescription] =
    useState("");

  const handleUpload = async () => {

    try {

      if (!file) {
        alert("Upload Resume");
        return;
      }

      const formData = new FormData();

      formData.append("resume", file);

      console.log("Uploading Resume...");

      const uploadResponse = await axios.post(
        "https://ai-career-platform-backend-m2y7.onrender.com/api/resume/upload",
        formData
      );

      console.log(
        "Upload Response:",
        uploadResponse.data
      );

      const extractedText =
        uploadResponse.data.extractedText;

      console.log(
        "Extracted Text:",
        extractedText
      );

      const analysisResponse =
        await axios.post(
          "https://ai-career-platform-backend-m2y7.onrender.com/api/resume/analyze",
          {
            resumeText: extractedText,
            jobDescription,
          }
        );

      console.log(
        "Analysis Response:",
        analysisResponse.data
      );

      setAnalysis({
        score: 85,
        matchScore: 78,
        fullAnalysis:
          analysisResponse.data.analysis,
      });

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

      alert("Resume analysis failed");
    }
  };

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="p-8">

        <h1 className="text-5xl font-bold text-center mb-8">
          Resume Analyzer
        </h1>

        <div className="max-w-4xl mx-auto bg-zinc-900 p-8 rounded-3xl">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            className="w-full bg-zinc-800 p-4 rounded-xl"
          />

          <textarea
            placeholder="Paste Job Description..."
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
            className="w-full bg-zinc-800 p-4 rounded-xl mt-4 h-40"
          />

          <button
            onClick={handleUpload}
            className="w-full mt-6 bg-white text-black font-bold py-4 rounded-xl"
          >
            Analyze Resume
          </button>

        </div>

        {analysis && (

          <div className="max-w-4xl mx-auto mt-10">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-zinc-900 p-8 rounded-3xl">

                <h2 className="text-2xl font-bold mb-4">
                  ATS Score
                </h2>

                <div className="text-6xl text-green-400 font-bold">
                  {analysis.score}%
                </div>

              </div>

              <div className="bg-zinc-900 p-8 rounded-3xl">

                <h2 className="text-2xl font-bold mb-4">
                  Job Match
                </h2>

                <div className="text-6xl text-blue-400 font-bold">
                  {analysis.matchScore}%
                </div>

              </div>

            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl mt-6">

              <h2 className="text-2xl font-bold mb-4">
                Full AI Analysis
              </h2>

              <pre className="whitespace-pre-wrap text-sm">
                {analysis.fullAnalysis}
              </pre>

            </div>

          </div>

        )}

      </div>

    </div>

  );
};

export default ResumeAnalyzer;