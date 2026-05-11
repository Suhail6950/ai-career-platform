import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

const Home = () => {

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="p-8 flex flex-col items-center justify-center">

        <h1 className="text-6xl font-bold mb-6 text-center">
          AI Career Platform
        </h1>

        <p className="text-gray-400 mb-12 text-center">
          Complete Career Development System
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">

          <Link
            to="/resume"
            className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 hover:bg-zinc-800 transition-all"
          >

            <h2 className="text-3xl font-bold mb-4">
              Resume Analyzer
            </h2>

            <p className="text-gray-400">
              ATS score and job matching
            </p>

          </Link>

          <Link
            to="/github"
            className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 hover:bg-zinc-800 transition-all"
          >

            <h2 className="text-3xl font-bold mb-4">
              GitHub Analyzer
            </h2>

            <p className="text-gray-400">
              Analyze repositories and profile
            </p>

          </Link>

          <Link
            to="/interview"
            className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 hover:bg-zinc-800 transition-all"
          >

            <h2 className="text-3xl font-bold mb-4">
              Interview Preparation
            </h2>

            <p className="text-gray-400">
              AI interview questions
            </p>

          </Link>

          <Link
            to="/coding"
            className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 hover:bg-zinc-800 transition-all"
          >

            <h2 className="text-3xl font-bold mb-4">
              Coding Platform
            </h2>

            <p className="text-gray-400">
              Coding practice environment
            </p>

          </Link>

        </div>

      </div>

    </div>

  );
};

export default Home;