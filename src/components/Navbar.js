import React from 'react'

const Navbar = () => {
  return (
    <div className="w-1/5 bg-white p-6 border-r space-y-8">
        <div className="mb-8">
          <div className="bg-gray-300 h-16 w-16 rounded-full mb-3"></div>
          <p className="text-lg font-semibold">UTS</p>
          <p className="text-sm text-gray-500">Faculty of Design</p>
        </div>
        <nav>
          <p className="font-semibold text-gray-700 mb-4">OVERVIEW</p>
          <ul className="space-y-3">
            <li className="text-gray-700 cursor-pointer">Dashboard</li>
            <li className="text-gray-700 cursor-pointer">Courses</li>
            <li className="text-gray-700 cursor-pointer">Calendar</li>
            <li className="text-gray-700 cursor-pointer">Search</li>
          </ul>
        </nav>
        <nav className="mt-8">
          <p className="font-semibold text-gray-700 mb-4">ACCOUNT</p>
          <ul className="space-y-3">
            <li className="text-gray-700 cursor-pointer">Help</li>
            <li className="text-gray-700 cursor-pointer">Settings</li>
            <li className="text-gray-700 cursor-pointer">Log out</li>
          </ul>
        </nav>
        <div className="absolute bottom-10 left-6">
          <p className="font-semibold">{'<Student Name>'}</p>
          <p className="text-sm text-gray-500">student@student.uts.edu.au</p>
        </div>
      </div>
  )
}

export default Navbar