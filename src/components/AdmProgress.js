import React, { useEffect, useState } from 'react';
import Firebase from '../Firebase'; 
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const AdmProgress = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(Firebase);

  useEffect(() => {
    const fetchUserProgress = async () => {
      setLoading(true);
      try {
        const usersQuery = collection(db, 'Users');
        const userSnapshot = await getDocs(usersQuery);
        const usersData = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users' progress:", error);
      }
      setLoading(false);
    };

    fetchUserProgress();
  }, [db]);

  if (loading) {
    return <div>Loading user progress...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard: User Progress</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User Email</th>
              <th className="py-2 px-4 border-b">Module Progress</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.Email}</td>
                <td className="py-2 px-4 border-b">
                  {user.progress ? (
                    Object.keys(user.progress).map(moduleId => (
                      <div key={moduleId}>
                        <p><strong> {moduleId}:</strong> {user.progress[moduleId].progress}%</p>
                      </div>
                    ))
                  ) : (
                    <p>No progress recorded.</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdmProgress;
