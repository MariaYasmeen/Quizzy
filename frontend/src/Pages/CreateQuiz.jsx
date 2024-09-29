import React, { useState } from "react";
import { useQuiz } from "../Context/QuizContext";
import CreateQuizForm from "../CreateQuiz/QuizInputs";
import QuestionForm from "../CreateQuiz/QuestionForm";
import axios from "axios";
import Navbar from "../Components/Navbar";
import "./Pages.css";

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

      // Validate required fields
      if (!title || !startDate || !endDate || questions.length === 0) {
        setMessage("Please fill in all the fields.");
        setLoading(false);
        return;
      }

      // Make the POST request to the backend
      const response = await axios.post(
        "http://127.0.0.1:3300/api/v1/quizzes",
        { title, description, isPublic, startDate, endDate, questions },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000, // 10 seconds timeout
        }
      );

      console.log("Response received:", response);
      const createdQuiz = response.data.data.quiz;
      setQuizId(createdQuiz._id);
      setMessage("Quiz created successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data);
        setMessage(
          `Error: ${error.response.data.message || "Failed to create quiz."}`
        );
      } else if (error.request) {
        console.error("Request error, no response:", error.request);
        setMessage("Server is not responding. Please try again later.");
      } else {
        console.error("Error setting up the request:", error.message);
        setMessage("Error occurred while sending request.");
      }
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
              <button
                className="btn btn-primary w-100 mt-4"
                type="submit"
                disabled
              >
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