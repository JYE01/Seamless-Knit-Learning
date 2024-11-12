import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar'; // Import Navbar

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminNavbar />

      <div className="w-5/6 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
