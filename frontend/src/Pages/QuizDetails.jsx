import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuizDetails } from "../services/publicQuiz";
import './Pages.css'; 

const QuizDetails = () => {
  const { quizId } = useParams();
  const [quizDetails, setQuizDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

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
    let calculatedScore = 0;

    quizDetails.questions.forEach((question) => {
      const selectedAnswer = userAnswers[question._id];
      const correctAnswers = question.options
        .filter((option) => option.isCorrect)
        .map((option) => option._id);

      if (correctAnswers.includes(selectedAnswer)) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);
  };

  if (loading) return <p>Loading quiz details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!quizDetails) return <p>No quiz details available.</p>;

  return (
    <div className="quiz-container">
      <h2 className="text-center ">{quizDetails.title}</h2>
      <p className="text-center">{quizDetails.description}</p>

      {submitted ? (
        <div>
          <h3>Your Score: {score}/{quizDetails.questions.length}</h3>
          <button onClick={() => setSubmitted(false)}>Try Again</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} >
          <ul className="question-list">
            {quizDetails.questions.map((question) => (
              <li key={question._id} className="question-item">
                <h4>{question.questionText}</h4>
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
          <button type="submit" className="submit-button">Submit </button>
        </form>
      )}
    </div>
  );
};

export default QuizDetails;
