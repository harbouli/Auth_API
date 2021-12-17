import React from "react";
import "../css/index.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="w-full bg-gray-900  py-6 ">
      <div className="w-10/12 mx-auto flex justify-between">
        <div></div>
        <div className="">
          <Link
            to="Login"
            className="ml-6 text-xl font-medium bg-slate-50 py-3 px-6 "
          >
            Login
          </Link>
          <Link to="Singup" className="ml-6 text-xl font-medium text-slate-50 ">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
