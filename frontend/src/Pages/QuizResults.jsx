import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { fetchQuizResults } from '../services/result';

const QuizResults = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const quizId = '66df08041ca2a346917eaa0e'; 

  useEffect(() => {
    const fetchResults = async () => {
      console.log("Starting fetch...");
      try {
        const data = await fetchQuizResults(quizId);
        console.log("Fetch successful:", data);
        setResults(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);  
        setLoading(false);
      }
    };

    fetchResults();
  }, [quizId]);

  if (loading) return <p>Loading results...</p>;
  if (error) return <p className="text-danger">{error}</p>;

   const totalCorrectAnswers = results.answers.filter(answer => answer.isCorrect).length;
  const percentage = ((totalCorrectAnswers / results.answers.length) * 100).toFixed(2);
  
   const status = percentage > 60 ? "Pass" : "Fail";

  return (
    <Container className="mt-5">
      <h2 className="text-center">Quiz Results</h2>

      <Row className="mt-4">
        <Col md={12}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <h5><strong>Quiz ID:</strong> {results.quiz}</h5>
              <h5><strong>Student ID:</strong> {results.student}</h5>
              <h5><strong>Total Questions:</strong> {results.answers.length}</h5>
              <h5><strong>Correct Answers:</strong> {totalCorrectAnswers}</h5>
              <h5><strong>Score:</strong> {percentage}%</h5>
              <h5><strong>Status:</strong> {status}</h5>
              <h5><strong>Submitted At:</strong> {new Date(results.submittedAt).toLocaleString()}</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default QuizResults;
