import { useState, useEffect } from 'react';
import Firebase from '../Firebase'; 
import {
  collection,
  query,
  getDocs,
  getFirestore,
} from 'firebase/firestore';

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [openQuizzes, setOpenQuizzes] = useState({}); // Track which Quizs are open
    const db = getFirestore(Firebase);

    useEffect(() => {
        const fetchData = async () => {
            const quizQuery = query(collection(db, 'Quizzes'));
            const quizSnapShot = await getDocs(quizQuery);
            const quizData = quizSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setQuizzes([...quizData]);
        };
        fetchData();
    }, [db]);

    const toggleQuiz = (index) => {
        setOpenQuizzes(prevState => ({
            ...prevState,
            [index]: !prevState[index] // Toggle the state of the clicked Quiz
        }));
    };

    return (
        <div className="bg-white p-6 shadow rounded-lg space-y-4">
        {quizzes.map((quiz, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold mb-3">{quiz.name}</h2>
              {/* <button
                onClick={() => toggleQuiz(index)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                {openQuizzes[index] ? 'Hide All' : 'Show All'}
              </button> */}
            </div>

            {/* Conditionally render subtopics */}
            {/* {openQuizzes[index] && (
              <div className="mt-4">
                {quiz.subtopics ? (
                  <ul className="space-y-2 pl-4">
                    {quiz.subtopics.map((subtopic, subIndex) => (
                      <li key={subIndex} className="text-gray-700">
                        <i className="mr-2">📄</i> {subtopic}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No subtopics available</p>
                )}
              </div>
            )} */}
          </div>
        ))}
        </div>
    );
}

export default Quiz;
