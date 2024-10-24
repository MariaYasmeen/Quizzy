import React, { useEffect, useState } from "react";
import { fetchPublicQuizzes } from "../services/fetchQUIZ";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Spinner, Container, Row } from "react-bootstrap";
import QuizCard from "../Components/QuizCard";
import { getRandomColor } from "../services/quizUtils" ;
import './Pages.css';   

const PublicQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar />
      <Container className="py-4">
        <h2 className="text-center mb-5">Public Quizzes</h2>
        <Row>
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz._id}
              btntxt="Start Quiz"
              quiz={quiz}
              onClick={() => handleQuizClick(quiz._id)}
              getRandomColor={getRandomColor}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PublicQuizzes;
