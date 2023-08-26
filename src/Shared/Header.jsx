import { Link, NavLink, useNavigate } from "react-router-dom";
import ButtonShared from "./ButtonShared";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../Router/AuthProvider";
// import { MdOutlineContacts } from "react-icons/md";
import logo from "../assets/contacts.logo-removebg-preview (1).png";
import {
  FcAddDatabase,
  FcBusinessContact,
  FcContacts,
  FcHome,
} from "react-icons/fc";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLOgout = () => {
    logOut().then(() => {
      navigate("/login");
    });
  };
  const navItems = (
    <>
      <li className="hover:text-warning md:border-r border-warning  px-1">
        <NavLink to={"/"}>
          <FcHome className="text-xs text-warning bg-transparent" /> Home
        </NavLink>
      </li>

      <li className="hover:text-warning md:border-r border-warning  px-1">
        <NavLink to={"/allContacts"}>
          <FcContacts className="text-xs text-warning" /> All Contacts List
        </NavLink>
      </li>
      <li className="hover:text-warning  border-warning  px-1">
        <NavLink to={"/addContacts"}>
          <FcAddDatabase className="text-xs text-warning" /> Add Contact
        </NavLink>
      </li>
      {user && (
        <>
          {" "}
          <li className="hover:text-warning md:border-s md:border-e border-warning  px-1">
            <NavLink to={"/myContacts"}>
              <FcBusinessContact className="text-xs text-warning" /> My Contacts
              List
            </NavLink>
          </li>
          <li className="hover:text-warning  px-1">
            <NavLink
              to={"/dashboard/permissionManage"}
              exact
              activeClassName="active"
            >
              <MdOutlineDashboardCustomize className="text-sm text-warning" />
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar md:px-12 fixed  z-10 bg-opacity-50 text-white bg-black">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52    bg"
          >
            {navItems}
          </ul>
        </div>
        <Link to={"/"} className="">
          {" "}
          <img className="w-44" src={logo} alt="" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 uppercase text-xs">
          {navItems}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <Link onClick={handleLOgout}>
            {" "}
            <ButtonShared>
              {" "}
              logout
              <LuLogOut className="md:text-xl" />
            </ButtonShared>
          </Link>
        ) : (
          <Link className=" btn btn-outline  btn-warning outline" to="/login">
            login
            <LuLogIn className="md:text-xl" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
