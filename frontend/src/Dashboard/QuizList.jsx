import React, { useEffect, useState } from "react";
import { fetchPrivateQuizzes } from "../services/privateQuiz";
import { useNavigate } from "react-router-dom";
import { Spinner, Container, Row, Alert } from "react-bootstrap"; // Alert for success/error message
import QuizCard from "./QuizCard";
import { getRandomColor } from "../services/quizUtils";
import { DeleteQuiz } from "../services/quizUD";
import './Dashboard.css';  // Custom styles
import Navbar from "../Components/Navbar";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // For success messages
  const navigate = useNavigate();

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const quizData = await fetchPrivateQuizzes();
        setQuizzes(quizData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getQuizzes();
  }, []);

   const handleQuizDelete = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await DeleteQuiz(quizId);  
        setQuizzes((prevQuizzes) => prevQuizzes.filter(quiz => quiz._id !== quizId));  
        setSuccess("Quiz deleted successfully!");  
      } catch (err) {
        setError(err.message);  
      }
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div>
        <Container className="py-4">
          <h2 className="text-center mb-5">Private Quizzes</h2>

          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>} {/* Handle error */}

          <Row>
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz._id}
                quiz={quiz}
                btntxt1="View"
                btntxt2="Delete Quiz"
                onClick1={() => navigate(`/quiz/${quiz._id}`)} 
                onClick2={() => handleQuizDelete(quiz._id)}
                getRandomColor={getRandomColor}
              />
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default QuizList;
