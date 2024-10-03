import React, { useEffect, useState } from "react";
import { fetchPublicQuizzes } from "../services/publicQuiz"; 

const PublicQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    const getQuizzes = async () => {
      try {
        const quizData = await fetchPublicQuizzes(); 
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

   return (
    <div>
      <h2>Public Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicQuizzes;
