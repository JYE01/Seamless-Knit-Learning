import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import './Navbar.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [navVisible, setNavVisible] = useState(false); // Sidebar visibility state
  const location = useLocation();
  const dropdownRef = useRef(null); 
  const navRef = useRef(null); // Reference for sidebar container
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("Name");
    const email = localStorage.getItem("Email");
    setName(name);
    setEmail(email);
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if clicking outside of it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
      // Close sidebar if clicking outside of it
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, navRef]);

  const menuItems = [
    { name: "Dashboard", path: "/Main/Dashboard" },
    { name: "Quizzes", path: "/Main/Quizzes" },
    { name: "Discussion", path: "/Main/Discussion" },
  ];

  const handleSignOut = async () => {
    localStorage.removeItem("Email");
    localStorage.removeItem("Name");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      {/* Sidebar toggle button */}
      {!navVisible && (
        <button className="toggle-button" onClick={toggleNav}>
          <i className="fas fa-bars text-2xl"></i>
        </button>
      )}

      {/* Sidebar menu */}
      <div ref={navRef} className={`navbar ${navVisible ? 'navbar-visible' : ''}`}>
        <div className="relative account" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="flex items-center gap-2" style={{ background: 'none' }}>
            <i className="fas fa-user-circle text-5xl" style={{ marginLeft: "20px" }}></i>
          </button>

          {dropdownVisible && (
            <div className="absolute right-0 left-1 mt-2 w-60 bg-white rounded-lg shadow-lg py-4 z-10" style={{ marginTop: "100px" }}>
              <div className="flex flex-col items-center py-2">
                <div className="flex items-center justify-center bg-gray-200 w-14 h-14 rounded-full mb-2">
                  <span className="text-2xl font-bold">{Name.charAt(0)}</span>
                </div>
                <p className="font-bold">{Name}</p>
                <p className="text-sm text-gray-500">{Email}</p>
              </div>
              <div onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100 w-full">
                <i className="fas fa-sign-out-alt"></i> Sign Out
              </div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <p className="text-lg font-semibold" style={{ marginLeft: "20px", marginTop: "20px" }}>UTS</p>
          <p className="text-sm text-gray-500" style={{ marginLeft: "20px" }}>Faculty of Design</p>
        </div>

        <nav>
          <p className="font-semibold text-gray-700 mb-4 text-lg" style={{ marginLeft: "20px" }}>OVERVIEW</p>
          <ul className="space-y-6">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`block text-lg cursor-pointer py-2 px-4 rounded-lg 
                    ${location.pathname === item.path ? 'bg-blue-500 text-white' : 'text-gray-700'}
                    hover:bg-blue-200`}
                  onClick={() => setNavVisible(false)} // Close sidebar on link click
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
