import React, { useEffect, useState } from "react";
import { fetchPublicQuizzes } from "../services/publicQuiz";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Spinner, Container, Row, Col, Card, Button } from "react-bootstrap";
import './Pages.css';  // For any custom styles

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

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`);
    console.log(quizId);
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
            <Col lg={4} md={6} sm={12} className="mb-4" key={quiz._id}>
              <Card className="h-100 " style={{ borderRadius: '15px' }}>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center">{quiz.title}</Card.Title>
                  <Card.Text>{quiz.description}</Card.Text>
                  <button
                    variant="primary"
                    className="mt-auto btn-primary"
                    onClick={() => handleQuizClick(quiz._id)}
                   >
                    Take Quiz
                  </button>
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
