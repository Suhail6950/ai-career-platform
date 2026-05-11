import { Link, useNavigate }
from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (

    <div className="bg-zinc-900 border-b border-zinc-800 px-8 py-5 flex items-center justify-between">

      <h1 className="text-2xl font-bold text-white">
        AI Career Platform
      </h1>

      <div className="flex items-center gap-6">

        <Link
          to="/"
          className="text-white"
        >
          Home
        </Link>

        <Link
          to="/resume"
          className="text-white"
        >
          Resume
        </Link>

        <Link
          to="/github"
          className="text-white"
        >
          GitHub
        </Link>

        <Link
          to="/interview"
          className="text-white"
        >
          Interview
        </Link>

        <Link
          to="/coding"
          className="text-white"
        >
          Coding
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-5 py-2 rounded-xl font-bold"
        >
          Logout
        </button>

      </div>

    </div>

  );
};

export default Navbar;