import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Import Navbar

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />

      <div className="w-5/6 p-10">
        <Outlet /> 
      </div>
    </div>
  );
};

export default MainLayout;
