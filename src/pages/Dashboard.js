import React from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="w-4/5 p-10">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="space-y-6">
          {/* Module 1 */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Module 1</h2>
            <div className="h-3 bg-gray-300 rounded-full">
              <div className="h-3 bg-gray-700 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Progress: 60%</p>
          </div>

          {/* Module 2 */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Module 2</h2>
            <div className="h-3 bg-gray-300 rounded-full">
              <div className="h-3 bg-gray-700 rounded-full" style={{ width: '10%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Progress: 10%</p>
          </div>

          {/* Module 3 */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Module 3</h2>
            <div className="h-3 bg-gray-300 rounded-full"></div>
            <p className="text-sm text-gray-500 mt-2">Progress: 0%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
