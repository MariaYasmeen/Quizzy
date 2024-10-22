import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuestions } from '../services/getAllQA'; // Ensure this function can fetch a single question by ID
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import Navbar from '../Components/Navbar';
import { timeAgo } from '../services/timeago';

const QDetails = () => {
    const { questionId } = useParams();  
    const [questionData, setQuestionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestionDetails = async () => {
            try {
                const data = await fetchQuestions(questionId); 
                setQuestionData(data);  
            } catch (err) {
                setError(err.message);  
            } finally {
                setLoading(false);  
            }
        };

        fetchQuestionDetails();
    }, [questionId]);  

    if (loading) {
        return (
            <Container className="text-center">
                <Spinner animation="border" />
                <p>Loading...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <h4>Error: {error}</h4>
            </Container>
        );
    }

    return (
        <>
            <Navbar />
            <div className='py-5 px-5'>
                <h1>{questionData.questionText}</h1>  
                <Card.Text>
                    Asked by {Array.isArray(questionData.askedBy) ? questionData.askedBy.map(user => user.name).join(", ") : questionData.askedBy.name} | {questionData.votes} {questionData.votes === 1 ? "vote" : "votes"} | {timeAgo(questionData.createdAt)}
                </Card.Text>
                <Card.Text>
                    <strong>Status:</strong> {questionData.isResolved ? "Resolved" : "Not Resolved"}
                </Card.Text>
                <Card.Text>
                    <button className="btn btn-primary">Answer this Question</button>
                </Card.Text>
                <h5>Solutions:</h5>
                {questionData.answers.length > 0 ? (
                    <Row>
                        {questionData.answers.map((answer) => (
                            <Col key={answer._id} md={12} className="mb-3">
                                <Card className="p-3 shadow-sm">
                                    <Card.Body>
                                        <Card.Text>{answer.answerText}</Card.Text>
                                        <Card.Text className="text-muted">
                                            <p style={{ fontSize: "13px" }}>
                                                Answered by {Array.isArray(answer.answeredBy) ? answer.answeredBy.map(user => user.name).join(", ") : answer.answeredBy.name} | {answer.votes} {answer.votes === 1 ? "vote" : "votes"}
                                            </p>
                                            <p style={{ fontSize: "13px" }}>{timeAgo(answer.createdAt)}</p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p>No answers available for this question.</p>
                )}
            </div>
        </>
    );
};

export default QDetails;
