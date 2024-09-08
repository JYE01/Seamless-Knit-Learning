import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  // Retrieve the values from localStorage when the component mounts
  useEffect(() => {
    const name = localStorage.getItem("studentName");
    const email = localStorage.getItem("studentEmail");
    setStudentName(name);
    setStudentEmail(email);
  }, []);

  return (
    <div className="w-1/5 bg-white p-6 border-r space-y-8">
        <div className="mb-8">
          <div className="bg-gray-300 h-16 w-16 rounded-full mb-3"></div>
          <p className="text-lg font-semibold">UTS</p>
          <p className="text-sm text-gray-500">Faculty of Design</p>
        </div>
        <nav>
          <p className="font-semibold text-gray-700 mb-4">OVERVIEW</p>
          <ul className="space-y-3">
            <li className="text-gray-700 cursor-pointer">Dashboard</li>
            <li className="text-gray-700 cursor-pointer">Courses</li>
            <li className="text-gray-700 cursor-pointer">Calendar</li>
            <li className="text-gray-700 cursor-pointer">Search</li>
          </ul>
        </nav>
        <nav className="mt-8">
          <p className="font-semibold text-gray-700 mb-4">ACCOUNT</p>
          <ul className="space-y-3">
            <li className="text-gray-700 cursor-pointer">Help</li>
            <li className="text-gray-700 cursor-pointer">Settings</li>
            <Link to="/Login" className="navbar-link">
            <li className="text-gray-700 cursor-pointer">Log out</li>
            </Link>
          </ul>
        </nav>
        <div className="absolute bottom-10 left-6">
          <p className="font-semibold">{studentName}</p>
          <p className="text-sm text-gray-500">{studentEmail}</p>
        </div>
      </div>
  )
}

export default Navbar