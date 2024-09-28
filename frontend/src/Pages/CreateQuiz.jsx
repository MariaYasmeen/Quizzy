import React, { useState } from "react";
import { useQuiz } from "../Context/QuizContext";
import CreateQuizForm from "../CreateQuiz/CreateQuizForm";
import QuestionForm from "../CreateQuiz/QuestionForm";
import axios from "axios";
import Navbar from "../Components/Navbar";
import './Pages.css';

const CreateQuiz = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [quizId, setQuizId] = useState("");

  const {
    title = "",
    description = "",
    isPublic = false,
    startDate = "",
    endDate = "",
    questions = [],
  } = useQuiz();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Sending request...");
      const token = "your-auth-token"; 

   
      if (!title || !startDate || !endDate || questions.length === 0) {
        setMessage("Please fill in all the fields.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:3300/api/v1/quizzes",
        { title, description, isPublic, startDate, endDate, questions },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      
      console.log("Response received:", response);
      
      const createdQuiz = response.data.data.quiz;
      setQuizId(createdQuiz._id);
      setMessage("Quiz created successfully!");
    } catch (error) {
      console.error("Error during quiz creation:", error);
      setMessage("Failed to create quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-6">
        <form onSubmit={handleSubmit} className="quiz-form">
          <div className="card p-5 shadow">
            <h2 className="text-center mb-5">Create Your Quiz</h2>

            <CreateQuizForm />
            <QuestionForm />

            {loading ? (
              <button className="btn btn-primary w-100 mt-4" type="submit" disabled>
                Creating Quiz...
              </button>
            ) : (
              <button className="btn btn-success w-100 mt-4" type="submit">
                Create Quiz
              </button>
            )}

            {message && <p className="mt-3 text-center text-info">{message}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateQuiz;
