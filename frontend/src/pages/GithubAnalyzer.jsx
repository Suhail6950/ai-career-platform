import React, { useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

const GithubAnalyzer = () => {

  const [username, setUsername] =
    useState("");

  const [data, setData] =
    useState(null);

  const fetchGithub = async () => {

    const response = await axios.get(
      `https://ai-career-platform-backend-m2y7.onrender.com/api/github/${username}`
    );

    setData(response.data.profile);
  };

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="p-8">

        <h1 className="text-5xl font-bold text-center mb-8">
          GitHub Analyzer
        </h1>

        <div className="max-w-4xl mx-auto bg-zinc-900 p-8 rounded-3xl">

          <input
            type="text"
            placeholder="GitHub Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full bg-zinc-800 p-4 rounded-xl"
          />

          <button
            onClick={fetchGithub}
            className="w-full mt-6 bg-white text-black py-4 rounded-xl font-bold"
          >
            Analyze GitHub
          </button>

        </div>

        {data && (

          <div className="max-w-4xl mx-auto mt-10 bg-zinc-900 p-8 rounded-3xl">

            <div className="flex items-center gap-6">

              <img
                src={data.avatar}
                alt="avatar"
                className="w-28 h-28 rounded-full"
              />

              <div>

                <h2 className="text-3xl font-bold">
                  {data.name}
                </h2>

                <p className="text-gray-400 mt-2">
                  {data.bio}
                </p>

              </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">

              <div className="bg-zinc-800 p-6 rounded-2xl">

                <h3 className="text-gray-400">
                  Followers
                </h3>

                <p className="text-3xl font-bold mt-2">
                  {data.followers}
                </p>

              </div>

              <div className="bg-zinc-800 p-6 rounded-2xl">

                <h3 className="text-gray-400">
                  Following
                </h3>

                <p className="text-3xl font-bold mt-2">
                  {data.following}
                </p>

              </div>

              <div className="bg-zinc-800 p-6 rounded-2xl">

                <h3 className="text-gray-400">
                  Repositories
                </h3>

                <p className="text-3xl font-bold mt-2">
                  {data.publicRepos}
                </p>

              </div>

              <div className="bg-zinc-800 p-6 rounded-2xl">

                <h3 className="text-gray-400">
                  Total Stars
                </h3>

                <p className="text-3xl font-bold mt-2">
                  {data.totalStars}
                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );
};

export default GithubAnalyzer;