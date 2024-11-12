import React, { useState, useEffect } from 'react';
import AdmProgress from '../components/AdmProgress';

const Progress = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ marginTop: "2.5rem" }}>Progress</h1>
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
        <AdmProgress />
      </div>
    </div>
  );
};

export default Progress