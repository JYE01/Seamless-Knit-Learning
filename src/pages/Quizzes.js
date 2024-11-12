import React from "react";
import Quiz from "../components/Quiz";

const Quizzes = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold mb-8" style={{ marginTop: "2.5rem" }}>Quizzes</h1>
        <div className="space-y-6">
          <Quiz />
        </div>
    </div>
  );
};

export default Quizzes;