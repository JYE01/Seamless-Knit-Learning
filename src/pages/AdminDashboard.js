import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminModule from '../components/AdminModule';

const AdminDashboard = () => {
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate("/Admin/Dashboard/AddModule")
  }
  return (
    <>
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div class="flex justify-end">
        <button onClick={() => handleClick()} className="bg-blue-500 text-white px-3 py-1 rounded">
            +Add
        </button>
      </div>
    </div>
    <br></br>
    <div className="space-y-6">
        <AdminModule />
    </div>
    </>
  );
};

export default AdminDashboard;
