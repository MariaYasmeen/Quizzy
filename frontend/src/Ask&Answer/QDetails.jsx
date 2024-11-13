import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestionDetails } from "../services/Q&AFETCH";
import { QAContext } from "../QAContext/QAContext";
import { timeAgo } from "../services/timeago";
import { calculateScore } from "../services/HandlerUtils";
import { Card, Container, Row, Col, Spinner, Button } from "react-bootstrap";
import CreateAnswer from "./CreateA";
import AnswerCard from "../Components/AnswerCard";

const QDetails = () => {
  const { questionId } = useParams();
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const { qaData, votedAnswers, setVotedAnswers } = useContext(QAContext);
  const questionVotes = qaData.find((q) => q._id === questionId)?.votes || 0;
  console.log(questionData);

  useEffect(() => {
    fetchQuestionDetails(questionId, setQuestionData, setLoading, setError);
  }, [questionId]);

  const toggleAnswerForm = () => {
    setShowAnswerForm(!showAnswerForm);
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!questionData) return <p>Question data is loading or not available.</p>;

  return (
    <Container className="py-5">
      <h1>{questionData.questionText}</h1>
      <Card.Text className="text-muted mb-4">
        {questionData.answers.length} Answers | {questionVotes}{" "}
        {questionVotes === 1 ? "vote" : "votes"} |{" "}
        {timeAgo(questionData.createdAt)}
        <br />
        Asked by {questionData.askedBy.name}
      </Card.Text>

      <p style={{ fontSize: "14px" }}>
        {questionData.description || "No description available."}
      </p>

      {questionData.questionDocument?.[0] && (
        <img
          src={`/Q&A/${questionData.questionDocument[0]}`}
          alt="Question related"
          style={{ width: "100%", maxWidth: "300px", marginTop: "10px" }}
        />
      )}

      <Button variant="primary" onClick={toggleAnswerForm} className="mb-3">
        {showAnswerForm ? "Cancel" : "Answer this Question"}
      </Button>

      {showAnswerForm && <CreateAnswer questionId={questionId} />}

      <h5 className="mt-4">Solutions:</h5>
      {questionData.answers.length > 0 ? (
        <Row>
          {questionData.answers
            .slice()
            .reverse()
            .map((answer) => (
              <Col key={answer._id} md={12} className="mb-3">
                <AnswerCard
                  answer={answer}
                  questionId={questionId}
                  votedAnswers={votedAnswers}
                  setVotedAnswers={setVotedAnswers}
                  setQuestionData={setQuestionData}
                />
              </Col>
            ))}
        </Row>
      ) : (
        <p>No answers available for this question.</p>
      )}
    </Container>
  );
};

const LoadingState = () => (
  <Container className="text-center">
    <Spinner animation="border" />
    <p>Loading...</p>
  </Container>
);

const ErrorState = ({ error }) => (
  <Container>
    <h4>Error: {error}</h4>
  </Container>
);

export default QDetails;
