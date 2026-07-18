import React, { useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

const InterviewPrep = () => {

  const [role, setRole] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("");

  const [questions, setQuestions] =
    useState([]);

  const generateQuestions = async () => {

    const response = await axios.post(
      "https://ai-career-platform-f6c0.onrender.com/api/interview/questions",
      {
        role,
        difficulty,
      }
    );

    setQuestions(response.data.questions);
  };

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="p-8">

        <h1 className="text-5xl font-bold text-center mb-8">
          Interview Preparation
        </h1>

        <div className="max-w-4xl mx-auto bg-zinc-900 p-8 rounded-3xl">

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="w-full bg-zinc-800 p-4 rounded-xl"
          >

            <option value="">
              Select Role
            </option>

            <option>
              Frontend Developer
            </option>

            <option>
              Backend Developer
            </option>

            <option>
              MERN Stack Developer
            </option>

          </select>

          <select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value)
            }
            className="w-full bg-zinc-800 p-4 rounded-xl mt-4"
          >

            <option value="">
              Select Difficulty
            </option>

            <option>Easy</option>

            <option>Medium</option>

            <option>Hard</option>

          </select>

          <button
            onClick={generateQuestions}
            className="w-full mt-6 bg-white text-black py-4 rounded-xl font-bold"
          >
            Generate Questions
          </button>

        </div>

        {questions.length > 0 && (

          <div className="max-w-4xl mx-auto mt-10 bg-zinc-900 p-8 rounded-3xl">

            <h2 className="text-3xl font-bold mb-8">
              Interview Questions
            </h2>

            <div className="space-y-4">

              {questions.map(
                (question, index) => (

                  <div
                    key={index}
                    className="bg-zinc-800 p-5 rounded-2xl"
                  >
                    {index + 1}. {question}
                  </div>

                )
              )}

            </div>

          </div>

        )}

      </div>

    </div>

  );
};

export default InterviewPrep;