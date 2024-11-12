import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import Firebase from '../Firebase';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const QuizPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const db = getFirestore(Firebase);
    const quiz = location.state.quiz; // passed from previous page
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswerKeys] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchQuizData = async () => {
            const quizContent = doc(db, 'Quizzes', quiz.id);
            const quizSnap = await getDoc(quizContent);

            if (quizSnap.exists()) {
                setQuestions(quizSnap.data().Question);
                setAnswerKeys(quizSnap.data().Answer);
            } else {
                console.error('Quiz not found!');
            }
        };
        fetchQuizData();
    }, [db, quiz.id]);

    const handleAnswerChange = (questionIndex, answerIndex) => {
        setUserAnswers({
            ...userAnswers,
            [questionIndex]: answerIndex,  // Storing the selected answer index
        });
    };

    const handleSubmit = async () => {
        const userEmail = localStorage.getItem('Email');

        if (!userEmail) {
            toast.error("User email not found in local storage!");
            return;
        }

        if (questions.length !== Object.keys(userAnswers).length) {
            toast.error("Please answer all the questions before submitting!", {
                position: "top-center",
            });
            return;
        }

        let calculatedScore = 0;

        // Calculate score based on selected answers
        questions.forEach((question, index) => {
            const selectedAnswerIndex = userAnswers[index];  // User's selected answer
            if (selectedAnswerIndex !== undefined && answers[index][selectedAnswerIndex] === true) {
                calculatedScore += 1;
            }
        });

        setScore(calculatedScore);  // Update the score
        setSubmitted(true); // Mark quiz as submitted

        try {
            // Query the Users collection to find the document where Email field matches userEmail
            const usersRef = collection(db, 'Users');
            const emailQuery = query(usersRef, where("Email", "==", userEmail));
            const querySnapshot = await getDocs(emailQuery);

            if (querySnapshot.empty) {
                toast.error("No user found with the given email.");
                return;
            }

            // Assuming only one document matches the email
            const userDoc = querySnapshot.docs[0];
            const userDocRef = doc(db, 'Users', userDoc.id);

            // Update or create the Quiz field for the user
            await updateDoc(userDocRef, {
                [`Quiz.${quiz.Name}`]: true,  // update this quiz status as completed
            });
            toast.success("Quiz completion status updated!", {
                position: "top-center",
              });
        } catch (error) {
            console.error("Error updating quiz data:", error);
            toast.error("An error occurred while saving your quiz data.", {
                position: "top-center",
            });
        }
    };

    const handleBack = () => {
        if (location.pathname === '/Admin/QuizPage') {
            navigate('/Admin/Quizzes');
        } else {
            navigate('/Main/Quizzes');
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg" style={{marginTop:'2.5rem'}}>
            <h1 className="text-2xl font-bold mb-6">{quiz.Name}</h1>

            {/* Always maintain max height and allow scrolling */}
            <div className="overflow-y-auto max-h-[500px]">
                {questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-3">Question {questionIndex + 1}: {question}</h2>

                        {Object.entries(answers[questionIndex]).map(([answerKey, isCorrect], answerIndex) => (
                            <div 
                                key={answerIndex} 
                                className={`flex items-center mt-2 relative p-2 rounded-lg ${submitted && userAnswers[questionIndex] === answerKey && !isCorrect ? 'border border-red-500' : ''}`}
                            >
                                <input
                                    type="radio"
                                    id={`q${questionIndex}a${answerIndex}`}
                                    name={`question-${questionIndex}`}
                                    value={answerKey}
                                    onChange={() => handleAnswerChange(questionIndex, answerKey)}
                                    checked={userAnswers[questionIndex] === answerKey}
                                    disabled={submitted} // Disable input after submission
                                    className="mr-2"
                                />
                                <label htmlFor={`q${questionIndex}a${answerIndex}`} className="mr-2">
                                    {answerKey} {/* Rendering the answer key */}
                                </label>
                                
                                {submitted && (
                                    <>
                                        {/* If user selects the correct answer */}
                                        {userAnswers[questionIndex] === answerKey && isCorrect && (
                                            <span className="ml-2 text-green-500">
                                                <div className="bg-green-100 text-green-700 px-2 py-1 rounded inline-block">
                                                    Correct!
                                                </div>
                                            </span>
                                        )}

                                        {/* If user selects the wrong answer */}
                                        {userAnswers[questionIndex] === answerKey && !isCorrect && (
                                            <span className="ml-2 text-red-500">
                                                <div className="bg-red-100 text-red-700 px-2 py-1 rounded inline-block">
                                                    You Answered
                                                </div>
                                            </span>
                                        )}

                                        {/* Show the correct answer if it's not selected by the user */}
                                        {userAnswers[questionIndex] !== answerKey && isCorrect && (
                                            <span className="ml-2 text-green-500">
                                                <div className="bg-green-100 text-green-700 px-2 py-1 rounded inline-block">
                                                    Correct Answer
                                                </div>
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Conditionally render the Back button */}
            <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-500 text-white rounded mt-4 mr-2"
            >
                Back
            </button>

            {/* Conditionally render the Submit button or the score */}
            {!submitted ? (
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
                >
                    Submit
                </button>
            ) : (
                <div className="mt-6">
                    <h2 className="text-xl font-bold">Your Score: {score}/{questions.length}</h2>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default QuizPage;
