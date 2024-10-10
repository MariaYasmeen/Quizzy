import React, { useEffect, useState } from "react";
import { fetchPublicQuizzes } from "../services/publicQuiz";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Spinner, Container, Row, Col, Card } from "react-bootstrap";
import './Pages.css';  // For any custom styles
import AnimatedButton from "../StyleComponents/AnimBtn";

const PublicQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

   const softColors = [
    "#f8f9fa",  
    "#f5e1da",  
    "#e3fdfd",  
    "#ffebcc", 
    "#fff1e6", 
    "#d4f1f4", 
    "#ffe6e6",  
    "#e0f7fa", 
    "#f3e5f5",  
  ];

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

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`);
    console.log(quizId);
  };

  const getRandomColor = () => {
    return softColors[Math.floor(Math.random() * softColors.length)];
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
      <Container className="py-4  ">
        <h2 className="text-center mb-5">Public Quizzes</h2>
        <Row>
          {quizzes.map((quiz) => (
            <Col lg={4} md={6} sm={12} className="mb-3" key={quiz._id}>
              <Card
                className="h-100"
                style={{
                   backgroundColor: getRandomColor(),  // Set random background color
                }}
              >
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{quiz.title}</Card.Title>
                  <Card.Text>{quiz.description}</Card.Text>
                  <AnimatedButton
                    text="Start Quiz"
                    onClick={() => handleQuizClick(quiz._id)}
                    color="black"
                    borderColor="grey"
                    shadowColor="grey"
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PublicQuizzes;
