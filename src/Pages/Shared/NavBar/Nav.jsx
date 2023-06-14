import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

const Nav = () => {
  const { user, logOut } = useContext(AuthContext);
  const [activeButton, setActiveButton] = useState("");

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const navOptions = (
    <>
      <li>
        <Link
          to="/"
          className={`nav-link ${
            activeButton === "home" ? "active border" : ""
          }`}
          onClick={() => handleButtonClick("home")}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/classes/approved"
          className={`nav-link ${activeButton === "classes" ? "active" : ""}`}
          onClick={() => handleButtonClick("classes")}
        >
          Classes
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard"
          className={`nav-link ${activeButton === "dashboard" ? "active" : ""}`}
          onClick={() => handleButtonClick("dashboard")}
        >
          Dashboard
        </Link>
      </li>
    </>
  );

  return (
    <div className=" w-full">
      <div className="fixed top-0 z-10 max-w-screen-2xl navbar bg-opacity-30 text-white mxa backdrop-blur-md bg-black rounded-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <img className=" h-12" src="/public/newlogo.png" alt="" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <div className="flex items-center gap-1 border   p-1 pl-2 rounded-3xl shadow-lg">
                <span>{user?.displayName}</span>

                <img
                  className="h-10 rounded-full shadow-md "
                  src={user?.photoURL}
                  alt="dfgfg"
                />
              </div>

              <button onClick={handleLogOut} className="btn btn-ghost">
                LogOut
              </button>
            </>
          ) : (
            <>
              <Link className="border" to="/login">Login</Link>

              <Link className="border" to="/signup">SugnUp</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
