import React, { useEffect, useState } from 'react';
import Firebase from '../Firebase';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import { PieChart } from 'react-minimal-pie-chart';
import { useNavigate } from 'react-router-dom';

const QuizProgress = () => {
    const [users, setUsers] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore(Firebase);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const usersQuery = collection(db, 'Users');
          const userSnapshot = await getDocs(usersQuery);
          const usersData = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUsers(usersData);
  
          const quizQuery = query(collection(db, 'Quizzes'));
          const quizSnapshot = await getDocs(quizQuery);
          const quizData = quizSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setQuizzes(quizData);
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

    const totalQuizzes = quizzes.length;
    const overallProgress = users.reduce((acc, user) => {
      const completedQuizzes = Object.values(user.Quiz || {}).filter(
        quiz => quiz === true
      ).length;
      const userQuizProgress = totalQuizzes ? (completedQuizzes / totalQuizzes) * 100 : 0;
      return acc + userQuizProgress;
    }, 0) / users.length;
    
    const handleBack = async () => {
      navigate("/Admin/Quizzes");
    }

  return (
    <div className="container mx-auto p-6" style={{ maxHeight: 'calc(95vh - 100px)', overflowY: 'auto' }}>
      <button onClick={handleBack} className="bg-blue-500 text-white px-3 py-1 rounded mb-4">
        <i className="fas fa-arrow-left mr-2"></i>Back
      </button>
    <h1 className="text-2xl font-semibold mb-4">Admin Dashboard: Quiz Progress</h1>
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
            <th className="py-2 px-4 border-b">Quiz Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            const completedQuizzes = Object.values(user.Quiz || {}).filter(
              quiz => quiz === true
            ).length;
            const totalProgress = totalQuizzes ? (completedQuizzes / totalQuizzes) * 100 : 0;

            return (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.Email}</td>
                <td className="py-2 px-4 border-b">
                  {totalProgress.toFixed(2)}%
                </td>
                <td className="py-2 px-4 border-b">
                  {Object.keys(user.Quiz || {}).map(quizId => (
                    <div key={quizId}>
                      <p><strong>{quizId}:</strong> <span style={{ color: "green" }}>completed!</span></p>
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
  )
}

export default QuizProgress