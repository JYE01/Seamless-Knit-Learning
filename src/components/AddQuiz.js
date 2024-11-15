import { useState } from 'react';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import Firebase from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddQuiz = () => {
  const db = getFirestore(Firebase); 
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answersCount, setAnswersCount] = useState(3);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", answers: Array(answersCount).fill({ text: "", correct: false }) }]);
  };

  const handleQuestionChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].text = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value, isCorrect) => {
    const updatedQuestions = [...questions];

    updatedQuestions[questionIndex].answers[answerIndex] = {
      ...updatedQuestions[questionIndex].answers[answerIndex], 
      text: value !== undefined ? value : updatedQuestions[questionIndex].answers[answerIndex].text, 
      correct: isCorrect !== undefined ? isCorrect : updatedQuestions[questionIndex].answers[answerIndex].correct,
    };
  
    setQuestions(updatedQuestions);
  };

  const handleSaveQuiz = async () => {
    try {
      await addDoc(collection(db, 'Quizzes'), {
        Name: quizName,
        Question: questions.map(q => q.text),
        Answer: questions.map(q =>
          q.answers.reduce((acc, answer) => {
            if (answer.text) {
              acc[answer.text] = answer.correct;
            }
            return acc;
          }, {})
        ),
      });
      toast.success("Quiz added successfully!'", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => navigate("/Admin/Quizzes")
      });
    } catch (error) {
      console.error("Error adding quiz: ", error);
      toast.error("Failed to add quiz!'", {
        position: "top-center",
      });
    }
  };

  const handleBack = async () => {
      navigate("/Admin/Quizzes");
  }

  return (
    <div className="max-w-15xl mx-auto bg-white p-6 rounded-lg shadow-md min-h-[400px] max-h-[700px] overflow-y-auto" style={{marginTop:'2.5rem'}}>
      <button onClick={handleBack} className="bg-blue-500 text-white px-3 py-1 rounded mb-4">
        <i className="fas fa-arrow-left mr-2"></i>Back
      </button>
      <h1 className="text-3xl font-bold mb-8 text-center">Add a New Quiz</h1>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Quiz Name</h3>
        <input
          type="text"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter quiz name"
        />
      </div>

      <div className="mb-4">
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-4">
            <label className="block text-gray-700 font-semibold">Question {questionIndex + 1}</label>
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
              className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter question ${questionIndex + 1}`}
            />

            <div>
              <div className="grid grid-cols-2 gap-4">
                {question.answers.map((answer, answerIndex) => (
                  <div key={answerIndex}>
                    <label className="block text-gray-700">Answer {answerIndex + 1}</label>
                    <input
                      type="text"
                      value={answer.text || ''}
                      placeholder={`Enter answer ${answerIndex + 1}`}
                      className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                      onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value, undefined)}
                    />
                   <div className="flex items-center">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={`answer_correct_${questionIndex}_${answerIndex}`}
                          value="true"
                          className="form-radio text-green-500"
                          checked={answer.correct === true}
                          onChange={() => handleAnswerChange(questionIndex, answerIndex, answer.text, true)}
                        />
                        <span className="ml-2">True</span>
                      </label>
                      <label className="inline-flex items-center ml-4">
                        <input
                          type="radio"
                          name={`answer_correct_${questionIndex}_${answerIndex}`}
                          value="false"
                          className="form-radio text-red-500"
                          checked={answer.correct === false}
                          onChange={() => handleAnswerChange(questionIndex, answerIndex, answer.text, false)}
                        />
                        <span className="ml-2">False</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 flex items-center space-x-4">
        <button
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Question
        </button>
        <input
          type="number"
          value={answersCount}
          min={1}
          max={4}
          onChange={(e) => setAnswersCount(Number(e.target.value))}
          className="w-16 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="block text-gray-700 text-sm font-bold"># Number of Answers</label>
      </div>

      <button
        onClick={handleSaveQuiz}
        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
      >
        Save Quiz
      </button>
      <ToastContainer />
    </div>
  );
};

export default AddQuiz;
