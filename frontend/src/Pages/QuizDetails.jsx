import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuizDetails } from "../services/publicQuiz";
const QuizDetails = () => {
  const { quizId } = useParams();
  const [quizDetails, setQuizDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading quiz details...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!quizDetails) return <p>No quiz details available.</p>; // Handle null quizDetails

  return (
    <div>
      <h2>{quizDetails.title}</h2>
      <p>{quizDetails.description}</p>
      <ul>
        {quizDetails.questions && quizDetails.questions.length > 0 ? ( // Check for questions
          quizDetails.questions.map((question) => (
            <li key={question._id}>
              <h4>{question.questionText}</h4>
              <ul>
                {question.options.map((option) => (
                  <li key={option._id}>
                    {option.text} {option.isCorrect ? "(Correct Answer)" : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p>No questions available for this quiz.</p>
        )}
      </ul>
    </div>
  );
};

export default QuizDetails;
