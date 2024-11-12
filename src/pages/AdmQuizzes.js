import React, { useState, useRef, useEffect } from "react";
import AdmQuiz from "../components/AdmQuiz";
import { Link } from "react-router-dom";

const AdmQuizzes = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [removeMode, setRemoveMode] = useState(false); // Track whether remove mode is active
  const dropdownRef = useRef(null); // Reference for dropdown container

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleRemoveMode = () => {
    setRemoveMode(!removeMode);
    setDropdownVisible(false); // Close dropdown when mode toggled
  };

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ marginTop: "2.5rem" }}>Quizzes</h1>
        
        <div className="relative flex justify-end items-center space-x-2" ref={dropdownRef}>
          <button className="bg-blue-500 text-white px-3 py-1 rounded">
            <Link to="/Admin/QuizProgress">
              <i className="fas fa-cog"></i> Progress
            </Link>
          </button>
          <button onClick={toggleDropdown} className="bg-blue-500 text-white px-3 py-1 rounded">
            <i className="fas fa-cog"></i> Edit
          </button>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-4 z-10">
              <Link to="/Admin/AddQuiz" className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100 w-full">
                <i className="fas fa-plus"></i> Add
              </Link>
              <button onClick={toggleRemoveMode} className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100 w-full">
                <i className="fas fa-trash-alt"></i> {removeMode ? "Cancel" : "Remove"}
              </button>
            </div>
          )}
        </div>
      <br />
      <div className="space-y-6">
        <AdmQuiz removeMode={removeMode} />
      </div>
    </div>
  );
};

export default AdmQuizzes;
