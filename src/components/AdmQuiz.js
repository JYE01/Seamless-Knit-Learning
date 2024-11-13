import { useState, useEffect } from 'react';
import Firebase from '../Firebase'; 
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
  deleteField,
  updateDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdmQuiz = ({ removeMode }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState(null); // To hold the quiz ID for deletion
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

                const userDoc = userSnapShot.docs[0];
                const userData = userDoc.data();

                if (userData.Quiz) {
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
        if (!removeMode) {
            navigate(`/Admin/QuizPage`, { state: { quiz } });
        }
    };

    // Show delete confirmation modal
    const handleDeleteClick = (quizId, quizName) => {
        setQuizToDelete({ id: quizId, name: quizName });
        setShowDeleteModal(true); // Show the confirmation modal
    };    

    // Delete quiz after confirmation
    const handleDeleteQuiz = async () => {
        try {
            // Delete the quiz from the "Quizzes" collection
            await deleteDoc(doc(db, 'Quizzes', quizToDelete.id));
            setQuizzes(quizzes.filter(quiz => quiz.id !== quizToDelete.id)); // Update UI after deletion
    
            // Delete the quiz progress from each user's "Quiz" field
            const usersCollection = collection(db, 'Users');
            const userDocs = await getDocs(usersCollection);
    
            userDocs.forEach(async (userDoc) => {
                const userRef = doc(db, 'Users', userDoc.id);
    
                // Use the quiz name to delete the specific quiz progress field in "Quiz"
                await updateDoc(userRef, {
                    [`Quiz.${quizToDelete.name}`]: deleteField(),
                });
            });
    
            toast.success("Quiz deleted successfully!", {
                position: "top-center",
            });
    
            setShowDeleteModal(false); // Close the modal
            setQuizToDelete(null); // Reset quizToDelete
        } catch (error) {
            console.error("Error deleting quiz: ", error);
            toast.error("Error deleting quiz!", {
                position: "top-center",
            });
        }
    };
    

    return (
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-7/8 w-full bg-white p-4 lg:p-6 shadow rounded-lg space-y-4 overflow-y-auto mx-auto" 
         style={{ maxHeight: 'calc(85vh - 100px)' }}>
            <ToastContainer />
            {quizzes.map((quiz, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm lg:text-lg font-semibold mb-3">{quiz.Name}</h2>
                  
                  <div className="flex items-center">
                    {/* Check if the quiz is completed */}
                    {completedQuizzes.includes(quiz.Name) && (
                      <div className="flex items-center mr-4">
                          <span className="text-green-600 text-xs lg:text-sm font-bold">Completed!</span>
                          <svg className="w-4 h-4 lg:w-6 lg:h-6 text-green-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                      </div>
                    )}

                    {/* If removeMode is active, show 🗑️ icon for deleting */}
                    {removeMode ? (
                      <button 
                        onClick={() => handleDeleteClick(quiz.id, quiz.Name)} // Show delete confirmation
                        className="text-red-600 transition-all ml-4 hover:scale-125 hover:text-red-800 transform duration-200"
                        style={{
                            fontSize: '1.2rem',
                            background: 'none',
                          }}
                      >
                        🗑️
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleQuizClick(quiz)}
                        className="text-xs lg:text-sm bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Take Quiz
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed z-10 inset-0 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this quiz?</p>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-lg"
                                onClick={() => setShowDeleteModal(false)} // Close the modal
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-all"
                                onClick={handleDeleteQuiz} // Confirm delete
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
     </div>
    );
};

export default AdmQuiz;
