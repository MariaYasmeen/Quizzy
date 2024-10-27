import React, { useEffect, useState } from "react";
import { fetchPrivateQuizzes } from "../services/fetchQUIZ";
import { useNavigate } from "react-router-dom";
import { Spinner, Container, Row, Alert } from "react-bootstrap";
import QuizCard from "./QuizCard";
import { getRandomColor } from "../services/quizUtils";
import { DeleteQuiz } from "../services/quizUD";
import "./Dashboard.css";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
      await DeleteQuiz(quizId);
      try {
        setQuizzes((prevQuizzes) =>
          prevQuizzes.filter((quiz) => quiz._id !== quizId)
        );
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
         <Sidebar />
         <main className="flex-grow-1 overflow-auto" style={{ marginLeft: '200px', padding: '20px' }}>

      <div>
        <Container className="py-4">
          <h2 className="text-center mb-5">Private Quizzes</h2>

          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

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
      </main>
    </>
  );
};

export default QuizList;
