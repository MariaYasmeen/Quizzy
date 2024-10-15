import React, { useEffect, useState } from "react";
import { fetchPrivateQuizzes } from "../services/privateQuiz";
import { useNavigate } from "react-router-dom";
 import { Spinner, Container, Row } from "react-bootstrap";
import QuizCard from "./QuizCard";
import { getRandomColor } from "../services/quizUtils" ;
import './Dashboard.css';  // For custom styles
import Navbar from "../Components/Navbar";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  const  handleQuizDelete = (quizId) =>{

  }

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
        <Row>
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz._id}
              quiz={quiz}
              btntxt1="View"
              btntxt2="Delete Quiz"
              onClick1={() => handleQuizClick(quiz._id)}
              onClick2={() =>handleQuizDelete(quiz._id) }
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
