import React, { useState } from "react";

import { useNavigate, Link }
from "react-router-dom";

import axios from "axios";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Success");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }
  };

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-zinc-900 p-10 rounded-3xl w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full bg-zinc-800 p-4 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full bg-zinc-800 p-4 rounded-xl"
        />

        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-white text-black py-4 rounded-xl font-bold"
        >
          Login
        </button>

        <p className="text-center mt-6 text-gray-400">

          Don't have an account?

          <Link
            to="/register"
            className="text-white ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );
};

export default Login;