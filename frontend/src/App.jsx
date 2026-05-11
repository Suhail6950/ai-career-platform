import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";

import ResumeAnalyzer from "./pages/ResumeAnalyzer";

import GithubAnalyzer from "./pages/GithubAnalyzer";

import InterviewPrep from "./pages/InterviewPrep";

import CodingPlatform from "./pages/CodingPlatform";

import Login from "./pages/Login";

import Register from "./pages/Register";

const ProtectedRoute = ({ children }) => {

  const token =
    localStorage.getItem("token");

  if (!token) {

    return <Navigate to="/login" />;

  }

  return children;
};

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <ResumeAnalyzer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/github"
          element={
            <ProtectedRoute>
              <GithubAnalyzer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <InterviewPrep />
            </ProtectedRoute>
          }
        />

        <Route
          path="/coding"
          element={
            <ProtectedRoute>
              <CodingPlatform />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;