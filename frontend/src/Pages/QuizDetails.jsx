import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import QuestionDropdown from "../Components/QuestionDropdown";
import QuestionDisplay from "../Components/QuestionDisplay";
import ResultModal from "../Components/ResultModal";
import { loadQuizDetails } from "../services/quizUtils";
import {
  calculateMarkedIndices,
  calculateUnattemptedIndices,
  toggleMarkForReview,
  navigateToQuestion
} from "../services/quizUtils";
import { calculateScore } from "../services/calculateScores";
import './Pages.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const QuizDetails = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quizDetails, setQuizDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadQuizDetails(quizId, setQuizDetails, setError, setLoading);
  }, [quizId]);

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

  const currentQuestion = quizDetails.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizDetails.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const markedIndices = calculateMarkedIndices(quizDetails.questions, markedForReview);
  const unattemptedIndices = calculateUnattemptedIndices(quizDetails.questions, userAnswers);

  return (
    <>
      <Navbar />
      <div className="quiz-container">
        <h2 className="text-center">{quizDetails.title}</h2>
        <p className="text-center">{quizDetails.description}</p>

        <div className="d-flex justify-content-between mb-3">
          <QuestionDropdown
            indices={markedIndices}
            title="Marked Questions"
            navigateToQuestion={(index) => navigateToQuestion(setCurrentQuestionIndex, index)}
          />
          <QuestionDropdown
            indices={unattemptedIndices}
            title="Unattempted Questions"
            navigateToQuestion={(index) => navigateToQuestion(setCurrentQuestionIndex, index)}
          />
        </div>

        <form onSubmit={handleSubmit}>
          {currentQuestion ? (
            <QuestionDisplay
              question={currentQuestion}
              userAnswers={userAnswers}
              setUserAnswers={setUserAnswers}
              currentQuestionIndex={currentQuestionIndex}
              markedForReview={markedForReview}
              toggleMarkForReview={setMarkedForReview}
            />
          ) : (
            <p>No questions available for this quiz.</p>
          )}

          <div className="navigation-buttons">
            {!isFirstQuestion && (
              <button
                type="button"
                className="ctrlbtns"
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              >
                Back
              </button>
            )}
            {!isLastQuestion && (
              <button
                type="button"
                className="ctrlbtns"
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              >
                Next
              </button>
            )}
            {isLastQuestion && (
              <button type="submit" className="ctrlbtns">
                Submit
              </button>
            )}
          </div>
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
