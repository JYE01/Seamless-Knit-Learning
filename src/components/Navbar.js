import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = ({ setActiveContent }) => {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("studentName");
    const email = localStorage.getItem("studentEmail");
    setStudentName(name);
    setStudentEmail(email);
  }, []);

  const firstCharacter = studentName ? studentName.charAt(0) : '';

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="w-1/5 bg-white p-6 border-r space-y-8">
      <div className="relative account">
        <button onClick={toggleDropdown} className="flex items-center gap-2">
          <i className="fas fa-user-circle text-5xl"></i>
        </button>

        {dropdownVisible && (
          <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg py-4 z-10">
            <div className="flex flex-col items-center py-2">
              <div className="flex items-center justify-center bg-gray-200 w-14 h-14 rounded-full mb-2">
                <span className="text-2xl font-bold">{firstCharacter}</span>
              </div>
              <p className="font-bold">{studentName}</p>
              <p className="text-sm text-gray-500">{studentEmail}</p>
            </div>
            <Link to="/account" className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100 w-full">
              <i className="fas fa-cog"></i> Manage Account
            </Link>
            <Link to="/login" className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100 w-full">
              <i className="fas fa-sign-out-alt"></i> Sign Out
            </Link>
          </div>
        )}
      </div>

      <div className="mb-8">
        <p className="text-lg font-semibold">UTS</p>
        <p className="text-sm text-gray-500">Faculty of Design</p>
      </div>

      <nav>
        <p className="font-semibold text-gray-700 mb-4">OVERVIEW</p>
        <ul className="space-y-3">
          <li onClick={() => setActiveContent("dashboard")} className="text-gray-700 cursor-pointer">Dashboard</li>
          <li onClick={() => setActiveContent("courses")} className="text-gray-700 cursor-pointer">Courses</li>
          <li onClick={() => setActiveContent("discussion")} className="text-gray-700 cursor-pointer">Discussion</li>
          <li onClick={() => setActiveContent("calendar")} className="text-gray-700 cursor-pointer">Calendar</li>
          <li className="text-gray-700 cursor-pointer">Search</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
