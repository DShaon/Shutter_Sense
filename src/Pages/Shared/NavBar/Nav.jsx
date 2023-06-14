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
          className={`border ${
            activeButton === "home" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("home")}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className={`border ${
            activeButton === "instructor" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("instructor")}
        >
          Instructor
        </Link>
      </li>
      <li>
        <Link
          to="/classes/approved"
          className={`border ${activeButton === "classes" ? "active" : ""}`}
          onClick={() => handleButtonClick("classes")}
        >
          Classes
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard"
          className={`border ${activeButton === "dashboard" ? "active" : ""}`}
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
              className="flex gap-2 menu menu-compact  dropdown-content mt-3 p-2 shadow backdrop-blur-md border bg-black bg-opacity-75 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <p className="text-3xl font-bold">ShutterSense</p>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="flex gap-4 menu menu-horizontal px-1">{navOptions}</ul>
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
              <Link className=" border bg-white hover:bg-black bg-opacity-10  backdrop-blur-md px-5 py-2 rounded-2xl " to="/login">
                Login
              </Link>

            
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
