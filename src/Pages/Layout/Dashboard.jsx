import { AiOutlineMenuFold } from "react-icons/ai";
import {  NavLink,  Outlet } from "react-router-dom";
import {
  FcBusinessContact,
  FcContacts,
  FcHome,
  FcQuestions,
  FcShare,
} from "react-icons/fc";
import logo from '../../assets/contacts.logo-removebg-preview (1).png'

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open text-white">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content md:items-center justify-center min-h-screen bg-gradient-to-b">
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="drawer-button  btn btn-warning btn-outline border-2 text-white  btn-lg   lg:hidden fixed right-0 top-0  m-2 "
        >
          <AiOutlineMenuFold />
        </label>
      </div>
      <div className="drawer-side ">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full  text-white  bg-gradient-to-b  border-warning border-2">
          {/* Sidebar content here */}
          <NavLink to={"/"} className="">
            {" "}
            <img className="w-44" src={logo} alt="" />
          </NavLink>

          <li className="mt-5">
            <NavLink to={"/dashboard/permissionManage"}>
              <FcQuestions className="text-xl" /> Permission Management
            </NavLink>
          </li>
          <li className="  ">
            <NavLink to={"/dashboard/sharedContactsList"}>
              <FcShare className="text-xl" /> Shared Contacts List
            </NavLink>
          </li>

          <div className="border-b border-warning py-3 mb-3"></div>

          <li>
            <NavLink to={"/"}>
              <FcHome className="text-xl " /> Home
            </NavLink>
          </li>

          <li className="hover:text-warning md:border-r border-warning">
            <NavLink to={"/allContacts"}>
              <FcContacts className="text-xl text-warning" /> All Contacts List
            </NavLink>
          </li>
          <li className="hover:text-warning border-warning ">
            <NavLink to={"/myContacts"}>
              <FcBusinessContact className="text-xl text-warning" /> My Contacts
              List
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
