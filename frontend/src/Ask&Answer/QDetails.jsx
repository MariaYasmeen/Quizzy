import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneQuestion } from "../services/Q&AFETCH"; 
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import Navbar from "../Components/Navbar";
import { timeAgo } from "../services/timeago";
import CreateAnswer from "./CreateA";  
import { createAnswer } from "../services/apiQuestion";

const QDetails = () => {
  const { questionId } = useParams();
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);  

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const data = await fetchOneQuestion(questionId);
        console.log("Fetched question data:", data);
        setQuestionData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionDetails();
  }, [questionId]);

  const addNewAnswer = async (newAnswerData) => {
    try {
      const newAnswer = await createAnswer(questionId, newAnswerData);
      setQuestionData((prevData) => ({
        ...prevData,
        answers: [...(prevData.answers || []), newAnswer],
      }));
    } catch (error) {
      console.error("Failed to add new answer:", error);
    }
  };

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

  if (!questionData) {
    return <p>Question data is loading or not available.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="py-5 px-5">
        <h1>{questionData?.questionText}</h1>
        <Card.Text>
          Asked by{" "}
          {Array.isArray(questionData?.askedBy)
            ? questionData.askedBy.map((user) => user.name).join(", ")
            : questionData.askedBy?.name}{" "} | {questionData?.votes}{" "}
          {questionData?.votes === 1 ? "vote" : "votes"} |{" "}
          {timeAgo(questionData?.createdAt)}
        </Card.Text>
        
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Answer this Question"}
        </button>

        {showForm && (
          <CreateAnswer 
            questionId={questionId} 
            onSuccess={addNewAnswer} 
          />
        )}

        <p style={{ fontSize: "14px" }}>{questionData?.description}</p>
  
        {questionData.questionDocument.length > 0 && (
          <img 
            src={questionData.questionDocument[0]} 
            alt="Question related" 
            style={{ width: '100%', maxWidth: '300px', marginTop: '10px' }} 
          />
        )}
               
        <h5>Solutions:</h5>
        {Array.isArray(questionData.answers) && questionData.answers.length > 0 ? (
          <Row>
            {questionData.answers.map((answer) => (
              <Col key={answer?._id} md={12} className="mb-3">
                <Card className="p-3 shadow-sm">
                  <Card.Body>
                    <Card.Text>{answer?.answerText}</Card.Text>
                    {/*   description will be printed here if the description is available */}
                    {answer?.description && (
                      <Card.Text className="text-muted">
                        Description: {answer.description}
                      </Card.Text>
                    )}
                    <Card.Text className="text-muted">
                      <span style={{ fontSize: "13px" }}>
                        {timeAgo(answer?.createdAt)}
                      </span>
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
