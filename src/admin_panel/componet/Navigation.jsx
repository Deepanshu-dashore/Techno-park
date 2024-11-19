import React, { useContext, useState } from "react";
import { LuPanelLeftClose } from "react-icons/lu";
import { FaBars, FaHome, FaFolder, FaImages, FaUsers, FaTrashAlt, FaSignOutAlt } from "react-icons/fa"; // Example icons
import { FireContext } from "../../Context/context";
import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const {LogoutAdmin} = useContext(FireContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${
        isOpen ? "w-80" : "w-16"
      } h-screen bg-white border-r-2 border-r-gray-200 shadow-md flex flex-col justify-between transition-all duration-300`}
    >
      {/* Toggle Button */}
      <div className="flex h-20 items-center justify-between px-4 py-3">
        <span className={`text-xl font-semibold ${isOpen ? "block" : "hidden"}`}>
         Admin
        </span>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={toggleSidebar}
        >
          <LuPanelLeftClose size={20} /> 
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow">
        <ul>
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-4 py-3 transition-all group ${
                  isActive ? "bg-gray-200 border-l-4 border-blue-500" : "hover:bg-gray-200 hover:border-l-4 hover:border-blue-500"
                }`
              }
            >
              <FaHome size={20} className="text-gray-600 group-hover:text-blue-500" />
              <span className={`${isOpen ? "block" : "hidden"} text-gray-700 group-hover:font-semibold`}>
                Home
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/files"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-4 py-3 transition-all group ${
                  isActive ? "bg-gray-200 border-l-4 border-blue-500" : "hover:bg-gray-200 hover:border-l-4 hover:border-blue-500"
                }`
              }
            >
              <FaFolder size={20} className="text-gray-600 group-hover:text-blue-500" />
              <span className={`${isOpen ? "block" : "hidden"} text-gray-700 group-hover:font-semibold`}>
                My Files
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/photos"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-4 py-3 transition-all group ${
                  isActive ? "bg-gray-200 border-l-4 border-blue-500" : "hover:bg-gray-200 hover:border-l-4 hover:border-blue-500"
                }`
              }
            >
              <FaImages size={20} className="text-gray-600 group-hover:text-blue-500" />
              <span className={`${isOpen ? "block" : "hidden"} text-gray-700 group-hover:font-semibold`}>
                Photos
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shared"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-4 py-3 transition-all group ${
                  isActive ? "bg-gray-200 border-l-4 border-blue-500" : "hover:bg-gray-200 hover:border-l-4 hover:border-blue-500"
                }`
              }
            >
              <FaUsers size={20} className="text-gray-600 group-hover:text-blue-500" />
              <span className={`${isOpen ? "block" : "hidden"} text-gray-700 group-hover:font-semibold`}>
                Shared
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recycle"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-4 py-3 transition-all group ${
                  isActive ? "bg-gray-200 border-l-4 border-blue-500" : "hover:bg-gray-200 hover:border-l-4 hover:border-blue-500"
                }`
              }
            >
              <FaTrashAlt size={20} className="text-gray-600 group-hover:text-blue-500" />
              <span className={`${isOpen ? "block" : "hidden"} text-gray-700 group-hover:font-semibold`}>
                Recycle Bin
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      {/* Logout Button */}
      <div className="px-4 py-1 border-y-2 border-indigo-500/10 -shadow-md inset-1">
        <button
           onClick={LogoutAdmin}
          className="flex items-center w-full group transition-all duration-200 hover:bg-red-600 hover:text-white py-2 rounded-md"
        >
          <span className={`${isOpen ? "block" : "hidden"} text-gray-700 ml-20 mr-5 group-hover:font-semibold group-hover:text-white`}>
            Logout
          </span>
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
          	<rect width="24" height="24" fill="none" />
          	<path fill="currentColor" d="M11.25 19a.75.75 0 0 1 .75-.75h6a.25.25 0 0 0 .25-.25V6a.25.25 0 0 0-.25-.25h-6a.75.75 0 0 1 0-1.5h6c.966 0 1.75.784 1.75 1.75v12A1.75 1.75 0 0 1 18 19.75h-6a.75.75 0 0 1-.75-.75" />
          	<path fill="currentColor" d="M15.612 13.115a1 1 0 0 1-1 1H9.756q-.035.533-.086 1.066l-.03.305a.718.718 0 0 1-1.025.578a16.8 16.8 0 0 1-4.885-3.539l-.03-.031a.72.72 0 0 1 0-.998l.03-.031a16.8 16.8 0 0 1 4.885-3.539a.718.718 0 0 1 1.025.578l.03.305q.051.532.086 1.066h4.856a1 1 0 0 1 1 1z" />
          </svg>
          </span>
        </button>
      </div>
      {/* Profile section  */}
      
          <div className={`w-full flex bg-gray-200 items-center gap-3 py-5 ${!isOpen?"px-1":"px-4"}`}>
            {/* Profile Initials */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-300 via-blue-500 to-purple-300 flex justify-center items-center border-4 border-indigo-800/20 font-semibold text-white">
              DD
            </div>
            {/* Profile Info */}
            { isOpen&&(
            <div className="flex-1">
              <p
                className="font-semibold capitalize text-gray-900 text-sm truncate"
                title="Deepanshu Dashore"
              >
                Deepanshu Dashore
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-gray-400"
                >
                  <rect width="24" height="24" fill="none" />
                  <path
                    fill="currentColor"
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-.4 4.25l-6.54 4.09c-.65.41-1.47.41-2.12 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44"
                  />
                </svg>
                <p className="truncate" title="deepanshudashore@gmail.com">
                  deepanshudashore@gmail.com
                </p>
              </div>
            </div>)
      }
          </div>
      
    </div>
  );
}
