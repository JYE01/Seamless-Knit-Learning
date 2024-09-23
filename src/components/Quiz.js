import { useState, useEffect } from 'react';
import Firebase from '../Firebase'; 
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  doc,
  getDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const db = getFirestore(Firebase);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('Email'); // Get user email from localStorage

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch quiz list
                const quizQuery = query(collection(db, 'Quizzes'));
                const quizSnapShot = await getDocs(quizQuery);
                const quizData = quizSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setQuizzes([...quizData]);

                // Fetch user data by Email field
                const userQuery = query(collection(db, 'Users'), where('Email', '==', userEmail));
                const userSnapShot = await getDocs(userQuery);

                if (userSnapShot.empty) {
                    console.error("No user found with the provided email.");
                    return;
                }

                // Assuming the email is unique and there's only one document
                const userDoc = userSnapShot.docs[0];
                const userData = userDoc.data();

                if (userData.Quiz) {
                    // Store the completed quizzes as an array
                    const completedQuizzesList = Object.keys(userData.Quiz).filter(quiz => userData.Quiz[quiz]);
                    setCompletedQuizzes(completedQuizzesList);
                }

            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, [db, userEmail]);

    const handleQuizClick = (quiz) => {
        // Navigate to QuizPage and pass the quiz ID or name
        navigate(`/Main/QuizPage`, { state: { quiz } });
    };

    return (
        <div className="bg-white p-6 shadow rounded-lg space-y-4">
            {quizzes.map((quiz, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold mb-3">{quiz.Name}</h2>
                  
                  <div className="flex items-center">
                    {/* Check if the quiz is completed */}
                    {completedQuizzes.includes(quiz.Name) && (
                      <div className="flex items-center mr-4">
                          <span className="text-green-600 font-bold">Completed!</span>
                          <svg className="w-6 h-6 text-green-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                      </div>
                    )}
                    <button 
                      onClick={() => handleQuizClick(quiz)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Take Quiz
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
    );
};

export default Quiz;
