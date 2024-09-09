import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Import Navbar

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Navbar) */}
      <Navbar />

      {/* Main Content */}
      <div className="w-4/5 p-10">
        <Outlet /> {/* This will render the current page content */}
      </div>
    </div>
  );
};

export default MainLayout;
