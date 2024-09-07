import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-white p-5 border-r">
        <div className="mb-10">
          <div className="bg-gray-300 h-16 w-16 rounded-full mb-2"></div>
          <p className="text-lg font-semibold">UTS</p>
          <p className="text-sm text-gray-500">Faculty of Design</p>
        </div>
        <nav className="space-y-5">
          <div className="text-gray-700">
            <p className="font-bold text-md mb-3">OVERVIEW</p>
            <ul>
              <li className="mb-2 cursor-pointer">Dashboard</li>
              <li className="mb-2 cursor-pointer">Courses</li>
              <li className="mb-2 cursor-pointer">Calendar</li>
              <li className="mb-2 cursor-pointer">Search</li>
            </ul>
          </div>
          <div className="text-gray-700 mt-10">
            <p className="font-bold text-md mb-3">ACCOUNT</p>
            <ul>
              <li className="mb-2 cursor-pointer">Help</li>
              <li className="mb-2 cursor-pointer">Settings</li>
              <li className="mb-2 cursor-pointer">Log out</li>
            </ul>
          </div>
        </nav>
        <div className="absolute bottom-5 left-5">
          <p className="font-semibold">{'<Student Name>'}</p>
          <p className="text-sm text-gray-500">student@student.uts.edu.au</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-10">
        <h1 className="text-3xl font-bold mb-10">Dashboard</h1>
        <div className="space-y-6">
          {/* Module 1 */}
          <div className="bg-white p-5 shadow rounded-md">
            <h2 className="text-xl font-bold mb-2">Module 1</h2>
            <div className="h-2 bg-gray-300 rounded-full w-full">
              <div className="h-2 bg-gray-700 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Progress: 60%</p>
          </div>

          {/* Module 2 */}
          <div className="bg-white p-5 shadow rounded-md">
            <h2 className="text-xl font-bold mb-2">Module 2</h2>
            <div className="h-2 bg-gray-300 rounded-full w-full">
              <div className="h-2 bg-gray-700 rounded-full" style={{ width: '10%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Progress: 10%</p>
          </div>

          {/* Module 3 */}
          <div className="bg-white p-5 shadow rounded-md">
            <h2 className="text-xl font-bold mb-2">Module 3</h2>
            <div className="h-2 bg-gray-300 rounded-full w-full"></div>
            <p className="text-sm text-gray-500 mt-2">Progress: 0%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
