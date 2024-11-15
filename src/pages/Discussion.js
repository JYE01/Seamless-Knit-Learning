import React, { useState, useEffect } from 'react';
import Discuss from "../components/Discuss";

const Discussion = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      localStorage.setItem('searchTerm', searchTerm);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ marginTop: "2.5rem" }}>Discussion</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for topics..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="w-full h-full space-y-6">
        <Discuss searchTerm={debouncedSearchTerm} />
      </div>
    </div>
  );
};

export default Discussion;
