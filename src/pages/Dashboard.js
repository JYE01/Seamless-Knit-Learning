import React from 'react';
import Navbar from '../components/Navbar';
import Module from '../components/Module';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="w-4/5 p-10">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="space-y-6">
          <Module />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
