import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar'; // Import Navbar

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminNavbar />

      <div className="main-content w-full lg:w-5/6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
