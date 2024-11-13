import React, { useEffect, useState } from 'react';
import Firebase from '../Firebase';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import { PieChart } from 'react-minimal-pie-chart';

const AdmProgress = () => {
  const [users, setUsers] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(Firebase);
  const df = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0, // Display no decimals for whole numbers
    maximumFractionDigits: 2, // Allow up to 2 decimal places
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersQuery = collection(db, 'Users');
        const userSnapshot = await getDocs(usersQuery);
        const usersData = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);

        const moduleQuery = query(collection(db, 'Module'));
        const moduleSnapshot = await getDocs(moduleQuery);
        const moduleData = moduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setModules(moduleData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [db]);

  if (loading) {
    return <div>Loading user progress...</div>;
  }

  const totalModules = modules.length;
  const overallProgress = users.reduce((acc, user) => {
    const completedModules = Object.values(user.progress || {}).filter(
      module => module.completed
    ).length;
    const userProgress = totalModules ? (completedModules / totalModules) * 100 : 0;
    return acc + userProgress;
  }, 0) / users.length;

  return (
    <div className="container mx-auto p-6" style={{ maxHeight: 'calc(85vh - 100px)', overflowY: 'auto', marginTop:'2.5rem'}}>
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard: User Progress</h1>
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-lg font-medium mb-2">Overall Progress</h2>
        <PieChart
          data={[
            { title: 'Completed', value: overallProgress, color: '#4caf50' },
            { title: 'Remaining', value: 100 - overallProgress, color: '#f44336' },
          ]}
          style={{ height: '250px' }}
        />
        <p className="text-sm text-gray-600">{overallProgress.toFixed(2)}% completed</p>
      </div>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User Email</th>
              <th className="py-2 px-4 border-b">Total Progress</th>
              <th className="py-2 px-4 border-b">Module Details</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              const completedModules = Object.values(user.progress || {}).filter(
                module => module.completed
              ).length;
              const totalProgress = totalModules ? (completedModules / totalModules) * 100 : 0;

              return (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.Email}</td>
                  <td className="py-2 px-4 border-b">
                    {totalProgress.toFixed(2)}%
                  </td>
                  <td className="py-2 px-4 border-b">
                    {Object.keys(user.progress || {}).map(moduleId => (
                      <div key={moduleId}>
                        <p><strong>{moduleId}:</strong> {df.format(user.progress[moduleId].progress)}%</p>
                      </div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdmProgress;
