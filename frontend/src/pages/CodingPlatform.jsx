import { useState } from "react";

import Navbar from "../components/Navbar";

const PROBLEMS = [
  {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    functionName: "reverseString",
    description:
      "Write a function that takes a string and returns it reversed.",
    examples: [
      { input: '"hello"', output: '"olleh"' },
      { input: '"claude"', output: '"edualc"' },
    ],
    starterCode:
      "function reverseString(str) {\n  // write your logic here\n\n}\n",
    testCases: [
      { args: ["hello"], expected: "olleh" },
      { args: ["ab"], expected: "ba" },
      { args: [""], expected: "" },
      { args: ["racecar"], expected: "racecar" },
    ],
  },
  {
    id: "palindrome-checker",
    title: "Palindrome Checker",
    difficulty: "Easy",
    functionName: "isPalindrome",
    description:
      "Write a function that returns true if the given string reads the same forwards and backwards, false otherwise.",
    examples: [
      { input: '"racecar"', output: "true" },
      { input: '"hello"', output: "false" },
    ],
    starterCode:
      "function isPalindrome(str) {\n  // write your logic here\n\n}\n",
    testCases: [
      { args: ["racecar"], expected: true },
      { args: ["hello"], expected: false },
      { args: ["a"], expected: true },
      { args: [""], expected: true },
    ],
  },
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Medium",
    functionName: "twoSum",
    description:
      "Given an array of numbers and a target, return the indices of the two numbers that add up to the target, as an array [i, j] with i < j.",
    examples: [
      { input: "[2, 7, 11, 15], target = 9", output: "[0, 1]" },
      { input: "[3, 2, 4], target = 6", output: "[1, 2]" },
    ],
    starterCode:
      "function twoSum(nums, target) {\n  // write your logic here\n\n}\n",
    testCases: [
      { args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { args: [[3, 2, 4], 6], expected: [1, 2] },
      { args: [[3, 3], 6], expected: [0, 1] },
    ],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Medium",
    functionName: "binarySearch",
    description:
      "Given a sorted array of numbers and a target value, return the index of the target using binary search, or -1 if it isn't present.",
    examples: [
      { input: "[1, 3, 5, 7, 9], target = 7", output: "3" },
      { input: "[1, 3, 5, 7, 9], target = 4", output: "-1" },
    ],
    starterCode:
      "function binarySearch(arr, target) {\n  // write your logic here\n\n}\n",
    testCases: [
      { args: [[1, 3, 5, 7, 9], 7], expected: 3 },
      { args: [[1, 3, 5, 7, 9], 4], expected: -1 },
      { args: [[1, 2, 3, 4, 5], 1], expected: 0 },
      { args: [[1, 2, 3, 4, 5], 5], expected: 4 },
    ],
  },
  {
    id: "merge-sort",
    title: "Merge Sort",
    difficulty: "Hard",
    functionName: "mergeSort",
    description:
      "Write a function that sorts an array of numbers in ascending order using the merge sort algorithm, and returns the sorted array.",
    examples: [
      { input: "[5, 2, 4, 1, 3]", output: "[1, 2, 3, 4, 5]" },
    ],
    starterCode:
      "function mergeSort(arr) {\n  // write your logic here\n\n}\n",
    testCases: [
      { args: [[5, 2, 4, 1, 3]], expected: [1, 2, 3, 4, 5] },
      { args: [[]], expected: [] },
      { args: [[1]], expected: [1] },
      { args: [[9, 8, 7, 6]], expected: [6, 7, 8, 9] },
    ],
  },
];

const difficultyColor = {
  Easy: "text-green-400",
  Medium: "text-yellow-400",
  Hard: "text-red-400",
};

const CodingPlatform = () => {

  const [selected, setSelected] = useState(PROBLEMS[0]);

  const [code, setCode] = useState(PROBLEMS[0].starterCode);

  const [results, setResults] = useState(null);

  const [running, setRunning] = useState(false);

  const selectProblem = (problem) => {
    setSelected(problem);
    setCode(problem.starterCode);
    setResults(null);
  };

  const runCode = () => {

    setRunning(true);
    setResults(null);

    // Give the UI a beat to show the running state before the
    // (synchronous) execution below.
    setTimeout(() => {

      const logs = [];

      const testResults = [];

      let compileError = null;

      let fn;

      try {

        const factory = new Function(
          "console",
          `${code}\nreturn typeof ${selected.functionName} === "function" ? ${selected.functionName} : undefined;`
        );

        const sandboxConsole = {
          log: (...args) => logs.push(args.map(String).join(" ")),
        };

        fn = factory(sandboxConsole);

        if (typeof fn !== "function") {
          compileError = `Could not find a function named "${selected.functionName}". Make sure your function keeps that exact name.`;
        }

      } catch (err) {
        compileError = err.message;
      }

      if (!compileError) {

        selected.testCases.forEach((testCase, index) => {

          try {

            const actual = fn(...testCase.args);

            const passed =
              JSON.stringify(actual) ===
              JSON.stringify(testCase.expected);

            testResults.push({
              index,
              passed,
              actual,
              expected: testCase.expected,
              args: testCase.args,
            });

          } catch (err) {

            testResults.push({
              index,
              passed: false,
              error: err.message,
              expected: testCase.expected,
              args: testCase.args,
            });
          }
        });
      }

      setResults({
        compileError,
        logs,
        testResults,
      });

      setRunning(false);

    }, 300);
  };

  const passedCount = results
    ? results.testResults.filter((t) => t.passed).length
    : 0;

  return (

    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>

      <Navbar />

      <div className="p-4 md:p-6">

        <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
          Coding Practice Platform
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-[1600px] mx-auto">

          {/* Problem list */}
          <div className="lg:col-span-3 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 h-fit">

            <div className="text-xs uppercase tracking-widest text-zinc-500 mb-3 px-1">
              Problems
            </div>

            <div className="flex flex-col gap-1">
              {PROBLEMS.map((problem) => (
                <button
                  key={problem.id}
                  onClick={() => selectProblem(problem)}
                  className={`text-left px-3 py-3 rounded-xl transition-colors ${
                    selected.id === problem.id
                      ? "bg-zinc-800 border border-zinc-700"
                      : "hover:bg-zinc-900 border border-transparent"
                  }`}
                >
                  <div className="text-sm font-medium">{problem.title}</div>
                  <div
                    className={`text-xs mt-1 ${difficultyColor[problem.difficulty]}`}
                  >
                    {problem.difficulty}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="lg:col-span-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 h-fit">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selected.title}</h2>
              <span className={`text-xs font-semibold ${difficultyColor[selected.difficulty]}`}>
                {selected.difficulty}
              </span>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              {selected.description}
            </p>

            <div className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
              Examples
            </div>

            <div className="flex flex-col gap-3">
              {selected.examples.map((ex, i) => (
                <div key={i} className="bg-zinc-900 rounded-xl p-3 text-xs">
                  <div className="text-zinc-500 mb-1">Input</div>
                  <div className="mb-2 text-zinc-200">{ex.input}</div>
                  <div className="text-zinc-500 mb-1">Output</div>
                  <div className="text-green-400">{ex.output}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Editor + console */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">

              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-3 text-xs text-zinc-500">
                    solution.js
                  </span>
                </div>

                <button
                  onClick={runCode}
                  disabled={running}
                  className="bg-green-400 text-black text-sm font-bold px-5 py-1.5 rounded-lg disabled:opacity-50"
                >
                  {running ? "Running..." : "Run ▶"}
                </button>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full bg-zinc-950 text-sm p-4 h-72 outline-none resize-none leading-relaxed"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              />
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex-1">

              <div className="flex items-center justify-between mb-3">
                <div className="text-xs uppercase tracking-widest text-zinc-500">
                  Console
                </div>

                {results && !results.compileError && (
                  <div
                    className={`text-xs font-bold ${
                      passedCount === results.testResults.length
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {passedCount}/{results.testResults.length} tests passed
                  </div>
                )}
              </div>

              {!results && (
                <div className="text-sm text-zinc-600">
                  Run your code to see test results here.
                </div>
              )}

              {results?.compileError && (
                <div className="text-sm text-red-400 whitespace-pre-wrap">
                  {results.compileError}
                </div>
              )}

              {results && !results.compileError && (
                <div className="flex flex-col gap-2">

                  {results.logs.length > 0 && (
                    <div className="bg-zinc-900 rounded-lg p-3 text-xs text-zinc-400 whitespace-pre-wrap mb-2">
                      {results.logs.join("\n")}
                    </div>
                  )}

                  {results.testResults.map((t) => (
                    <div
                      key={t.index}
                      className={`rounded-lg p-3 text-xs border ${
                        t.passed
                          ? "border-green-900 bg-green-950/30"
                          : "border-red-900 bg-red-950/30"
                      }`}
                    >
                      <div
                        className={`font-bold mb-1 ${
                          t.passed ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        Test {t.index + 1} — {t.passed ? "Passed" : "Failed"}
                      </div>

                      <div className="text-zinc-500">
                        Input: {JSON.stringify(t.args)}
                      </div>

                      {t.error ? (
                        <div className="text-red-400 mt-1">
                          Error: {t.error}
                        </div>
                      ) : (
                        <>
                          <div className="text-zinc-500">
                            Expected: {JSON.stringify(t.expected)}
                          </div>
                          <div className="text-zinc-500">
                            Got: {JSON.stringify(t.actual)}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CodingPlatform;
