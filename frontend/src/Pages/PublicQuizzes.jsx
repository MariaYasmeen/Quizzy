import React, { useEffect, useState } from "react";
import { fetchPublicQuizzes } from "../services/publicQuiz";
import { useNavigate } from "react-router-dom";

const PublicQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const quizData = await fetchPublicQuizzes();
        console.log(quizData);
        setQuizzes(quizData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getQuizzes();
  }, []);

  if (loading) return <p>Loading quizzes...</p>;

  if (error) return <p>Error: {error}</p>;

  const handleQuizClick = (quizId) => {
     navigate(`/quiz/${quizId}`);
     console.log(quizId);
  };

  return (
    <div>
      <h2>Public Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id} onClick={() => handleQuizClick(quiz._id)} style={{ cursor: 'pointer' }}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicQuizzes;
