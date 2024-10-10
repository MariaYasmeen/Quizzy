import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResultModal from "../Components/ResultModal";
import { fetchQuizDetails } from "../services/publicQuiz";
import { calculateScore } from "../services/calculateScores";
import './Pages.css';
import Navbar from "../Components/Navbar";

const QuizDetails = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quizDetails, setQuizDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadQuizDetails = async () => {
      setLoading(true);
      try {
        const quiz = await fetchQuizDetails(quizId);
        setQuizDetails(quiz);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuizDetails();
  }, [quizId]);

  const handleChange = (questionId, optionId) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
     const calculatedScore = calculateScore(quizDetails, userAnswers);

    setScore(calculatedScore);
    setSubmitted(true);
    setShowModal(true);   
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");   
  };

  if (loading) return <p>Loading quiz details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!quizDetails) return <p>No quiz details available.</p>;

  return (
    <>
    <Navbar/>
    <div className="quiz-container">
      <h2 className="text-center">{quizDetails.title}</h2>
      <p className="text-center">{quizDetails.description}</p>

      <form onSubmit={handleSubmit}>
        <ul className="question-list">
          {quizDetails.questions.map((question) => (
            <li key={question._id} className="question-item">
              <h6 className="questi ons">{question.questionText}</h6>
              <div className="options-container">
                {question.options.map((option) => (
                  <label key={option._id} className="option-label">
                    <input
                      type="radio"
                      name={question._id}
                      value={option._id}
                      onChange={() => handleChange(question._id, option._id)}
                      checked={userAnswers[question._id] === option._id}
                    />
                    <span className="option-text">{option.text}</span>
                  </label>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <ResultModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        score={score} 
        totalQuestions={quizDetails.questions.length} 
      />
    </div>
    </>
  );
};

export default QuizDetails;
