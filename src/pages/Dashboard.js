import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Module from '../components/Module';
import Courses from '../components/Courses'; 
import Calendar from '../components/Calender';
import Discussion from '../components/Discussion';

const Dashboard = () => {
  // State to track which component is currently active
  const [activeContent, setActiveContent] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Navbar setActiveContent={setActiveContent} /> {/* Pass state setter to Navbar */}

      {/* Main Content */}
      <div className="w-4/5 p-10">
        <h1 className="text-3xl font-bold ">
          {activeContent === "dashboard" ? "Dashboard" : activeContent === "courses" ? "Courses" : activeContent === "discussion" ? "Discussion" : activeContent === "calendar" ? "Calendar" : ""}
        </h1>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold ">
            {activeContent === "dashboard" && <Module />}
            {activeContent === "courses" && <Courses />}
            {activeContent === "discussion" && <Discussion />} {/* Corrected the typo */}
            {activeContent === "calendar" && <Calendar />}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
