import React from 'react';
import Module from '../components/Module';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="space-y-6">
        <Module />
      </div>
    </div>
  );
};

export default Dashboard;
