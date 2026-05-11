import React, { useState } from "react";

import Navbar from "../components/Navbar";

const CodingPlatform = () => {

  const [selectedProblem,
    setSelectedProblem] = useState("");

  const [code, setCode] =
    useState("");

  const [output, setOutput] =
    useState("");

  const codingProblems = [

    {
      title: "Reverse String",
      difficulty: "Easy",
    },

    {
      title: "Palindrome Checker",
      difficulty: "Easy",
    },

    {
      title: "Two Sum Problem",
      difficulty: "Medium",
    },

    {
      title: "Binary Search",
      difficulty: "Medium",
    },

    {
      title: "Merge Sort",
      difficulty: "Hard",
    },

  ];

  const runCode = () => {

    if (!code) {

      setOutput(
        "Please write some code."
      );

      return;
    }

    setOutput(`
Code Executed Successfully ✅

Problem:
${selectedProblem}

Output:
Simulation Complete

Your logic looks good.
    `);
  };

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="p-8">

        <h1 className="text-5xl font-bold text-center mb-8">
          Coding Practice Platform
        </h1>

        <div className="max-w-5xl mx-auto bg-zinc-900 p-8 rounded-3xl">

          <select
            value={selectedProblem}
            onChange={(e) =>
              setSelectedProblem(e.target.value)
            }
            className="w-full bg-zinc-800 p-4 rounded-xl"
          >

            <option value="">
              Select Coding Problem
            </option>

            {codingProblems.map(
              (problem, index) => (

                <option
                  key={index}
                  value={problem.title}
                >
                  {problem.title} - {problem.difficulty}
                </option>

              )
            )}

          </select>

          <textarea
            placeholder="Write your code here..."
            value={code}
            onChange={(e) =>
              setCode(e.target.value)
            }
            className="w-full bg-zinc-800 p-4 rounded-xl mt-6 h-80 font-mono"
          />

          <button
            onClick={runCode}
            className="w-full mt-6 bg-green-400 text-black py-4 rounded-xl font-bold"
          >
            Run Code
          </button>

          {output && (

            <div className="bg-zinc-800 mt-6 p-6 rounded-2xl">

              <pre className="whitespace-pre-wrap">
                {output}
              </pre>

            </div>

          )}

        </div>

      </div>

    </div>

  );
};

export default CodingPlatform;