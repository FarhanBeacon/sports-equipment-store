import React from "react";
import ses from "../assets/ses.gif";
import { NavLink } from "react-router";

const Navbar = () => {
  const links = [
    <li>
      <NavLink to={"/"}>Home</NavLink>
    </li>,
    <li>
      <NavLink to={"/allEquipment"}>All Equipment</NavLink>
    </li>,
    <li>
      <NavLink to={"/addEquipment"}>Add Equipment</NavLink>
    </li>,
    <li>
      <NavLink to={"/myList"}>My List</NavLink>
    </li>,
  ];
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow navStyle"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <img className="hidden md:flex" src={ses} alt="" width="60px" />
            <a className="text-xl md:text-4xl font-semibold font-rancho">
              Sports Equipment Store
            </a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 navStyle">{links}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn text-xl md:text-2xl font-rancho">Login</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
