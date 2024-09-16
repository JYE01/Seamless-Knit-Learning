import React from "react";
import Discuss from "../components/Discuss";

const Discussion = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold mb-8">Discussion</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for topics..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="w-full h-full space-y-6">
          <Discuss />
        </div>
    </div>
  );
};

export default Discussion;