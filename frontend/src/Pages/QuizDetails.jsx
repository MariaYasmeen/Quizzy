import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResultModal from "../Components/ResultModal";
import { fetchQuizDetails } from "../services/publicQuiz";
import Navbar from "../Components/Navbar";
import { calculateScore } from "../services/calculateScores";
import { 
  calculateMarkedIndices,
  calculateUnattemptedIndices,
  toggleMarkForReview,
  navigateToQuestion 
} from "../services/quizUtils";  
import QuestionDropdown from "../Components/QuestionDropdown";
import QuestionDisplay from "../Components/QuestionDisplay";
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

  const handleToggleMarkForReview = (questionId) => {
    setMarkedForReview(prev => toggleMarkForReview(prev, questionId));
  };

  const handleNavigateToQuestion = (index) => {
    navigateToQuestion(setCurrentQuestionIndex, index);
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
            navigateToQuestion={handleNavigateToQuestion} 
           />
          <QuestionDropdown 
            indices={unattemptedIndices} 
            title="Unattempted Questions" 
            navigateToQuestion={handleNavigateToQuestion} 
           />
        </div>

        <form onSubmit={handleSubmit}>
          <QuestionDisplay 
            question={currentQuestion} 
            userAnswers={userAnswers} 
            setUserAnswers={setUserAnswers} 
            currentQuestionIndex={currentQuestionIndex} 
            markedForReview={markedForReview} 
            toggleMarkForReview={handleToggleMarkForReview} 
          />

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
