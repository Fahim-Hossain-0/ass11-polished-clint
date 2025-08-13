import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Links
  const loggedInLinks = (
    <>
      <NavLink to="/" className="font-light text-base">
        Home
      </NavLink>
      <NavLink to="/availableFoods" className="font-light text-base">
        Available Foods
      </NavLink>
      <NavLink to="/addFood" className="font-light text-base">
        Add Food
      </NavLink>
      <NavLink to="/manageMyFoods" className="font-light text-base">
        Manage My Foods
      </NavLink>
      <NavLink to="/requestedMyFood" className="font-light text-base">
        My Food Request
      </NavLink>
    </>
  );

  const loggedOutLinks = (
    <>
      <NavLink to="/" className="font-light text-base">
        Home
      </NavLink>
      <NavLink to="/availableFoods" className="font-light text-base">
        Available Foods
      </NavLink>
      <NavLink to="/contact" className="font-light text-base">
        Contact
      </NavLink>
    </>
  );

  const handleSignOut = () => {
    signOutUser().catch((error) => console.error(error));
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        scrolled ? "bg-blue-700 text-white shadow-md" : "bg-white text-blue-700"
      }`}
    >
      <div className="container mx-auto py-3">
        <div className="navbar">
          {/* Navbar start */}
          <div className="navbar-start">
            {/* Mobile dropdown */}
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
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
              </div>
              <ul
                tabIndex={0}
                className={`menu menu-sm dropdown-content mt-3 z-[1] w-52 p-2 shadow rounded-box ${
                  scrolled ? "bg-blue-700 text-white" : "bg-white text-blue-700"
                }`}
              >
                {user ? loggedInLinks : loggedOutLinks}
              </ul>
            </div>

            {/* Logo */}
            <Link to="/" className="font-bold text-3xl">
              <span className={scrolled ? "text-white" : "text-blue-700"}>
                Food
              </span>
              <span className="text-yellow-500">Hub</span>
            </Link>
          </div>

          {/* Navbar center - desktop */}
          <div className="navbar-center hidden lg:flex">
            <ul
              className={`menu menu-horizontal px-1 space-x-4 ${
                scrolled ? " text-white" : " text-blue-700"
              }`}
            >
              {user ? loggedInLinks : loggedOutLinks}
            </ul>
          </div>

          {/* Navbar end */}
          <div className="navbar-end">
            {user ? (
              <div className="flex items-center space-x-3">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        title={user?.displayName || "User"}
                      />
                    ) : (
                      <span className="text-sm font-medium">
                        {user?.displayName?.split(" ")[0] || "User"}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="bg-pink-300 text-gray-600 px-2 py-2 rounded font-bold"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link to="/auth/login" className="btn btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
