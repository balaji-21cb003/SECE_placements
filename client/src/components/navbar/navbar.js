import React from "react";
import logo from "../../logo.png";

const Navbar = () => {
  return (
    <nav className="">
      <div className="container bg-gray-800 text-white py-4 mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="ml-5">
          <img src={logo} alt="Logo" className="h-8" />
        </div>

        {/* Navigation Links */}
        <div className="mx-5">
          <ul className="flex ml-3 space-x-4">
            <li>
              <a href="/" className="hover:text-gray-300 hover:underline">
                Home
              </a>
            </li>
            <li>
              <a
                href="/firstyear"
                className="hover:text-gray-300 hover:underline"
              >
                1st Year
              </a>
            </li>
            <li>
              <a
                href="/secondyear"
                className="hover:text-gray-300 hover:underline"
              >
                2nd Year
              </a>
            </li>
            <li>
              <a
                href="/thirdyear"
                className="hover:text-gray-300 hover:underline"
              >
                3rd Year
              </a>
            </li>
            <li>
              <a
                href="/fourthyear"
                className="hover:text-gray-300 hover:underline"
              >
                4th Year
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
