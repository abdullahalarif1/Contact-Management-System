import { Link, useNavigate } from "react-router-dom";
import ButtonShared from "./ButtonShared";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { useContext } from "react";
import { AuthContext } from "../Router/AuthProvider";
// import { MdOutlineContacts } from "react-icons/md";
import {
  FcAddDatabase,
  FcBusinessContact,
  FcContacts,
  FcHome,
  FcQuestions,
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
      <li className="hover:text-warning md:border-r border-warning ">
        <Link to={"/"}>
          <FcHome className="text-xs text-warning " /> Home
        </Link>
      </li>

      <li className="hover:text-warning md:border-r border-warning">
        <Link to={"/allContacts"}>
          <FcContacts className="text-xs text-warning" /> All Contacts List
        </Link>
      </li>
      <li className="hover:text-warning md:border-r border-warning">
        <Link to={"/addContacts"}>
          <FcAddDatabase className="text-xs text-warning" /> Add Contact
        </Link>
      </li>
      {user && (
        <>
          {" "}
          <li className="hover:text-warning md:border-e border-warning">
            <Link to={"/myContacts"}>
              <FcBusinessContact className="text-xs text-warning" /> My Contacts
              List
            </Link>
          </li>
          <li className="hover:text-warning">
            <Link to={"/permissionManage"}>
              <FcQuestions className="text-sm text-warning" />
              Permissions
            </Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar md:px-12 fixed z-10 bg-opacity-50 text-white bg-black">
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
        <Link to={"/"} className="btn btn-ghost font-mono md:text-xl uppercase">
          {" "}
          <span className="text-warning "> Contact </span>Management
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
