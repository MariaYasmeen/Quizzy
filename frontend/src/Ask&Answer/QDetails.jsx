 import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestionDetails } from "../services/Q&AFETCH";
import { handleAnswerVoteClick } from "../QAContext/voteUtils";
import {timeAgo} from "../services/timeago";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import Navbar from "../Components/Navbar";
import CreateAnswer from "./CreateA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as solidThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as regularThumbsUp } from "@fortawesome/free-regular-svg-icons";

const QDetails = () => {
  const { questionId } = useParams();
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [votedAnswers, setVotedAnswers] = useState({});

  useEffect(() => {
    fetchQuestionDetails(questionId, setQuestionData, setLoading, setError);
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

  if (!questionData) {
    return <p>Question data is loading or not available.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="py-5 px-5">
        <h1>{questionData.questionText}</h1>
        <Card.Text>
          Asked by{" "}
          {Array.isArray(questionData.askedBy)
            ? questionData.askedBy.map((user) => user.name).join(", ")
            : questionData.askedBy?.name}{" "}
          | {questionData.votes} {questionData.votes === 1 ? "vote" : "votes"} |{" "}
          {timeAgo(questionData.createdAt)}
        </Card.Text>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Answer this Question"}
        </button>

        {showForm && <CreateAnswer questionId={questionId} />}

        <p style={{ fontSize: "14px" }}>
          {questionData.description || "No description available."}
        </p>

        {questionData.questionDocument.length > 0 && (
          <img
            src={questionData.questionDocument[0]}
            alt="Question related"
            style={{ width: "100%", maxWidth: "300px", marginTop: "10px" }}
          />
        )}

        <h5>Solutions:</h5>
        {Array.isArray(questionData.answers) &&
        questionData.answers.length > 0 ? (
          <Row>
            {questionData.answers.map((answer) => (
              <Col key={answer._id} md={12} className="mb-3">
                <Card className="p-3 shadow-sm">
                  <Card.Body>
                    <h5>{answer.answerText}</h5>
                    <Card.Text>
                      <p style={{ fontSize: "14px" }}>
                        {answer.description || "No description available."}
                      </p>
                    </Card.Text>
                    <div>
                      <FontAwesomeIcon
                        icon={
                          votedAnswers[answer._id]
                            ? solidThumbsUp
                            : regularThumbsUp
                        }
                        onClick={() =>
                          handleAnswerVoteClick(
                            answer._id,
                            questionId,
                            votedAnswers,
                            setVotedAnswers,
                            setQuestionData
                          )
                        }
                        style={{ cursor: "pointer", marginRight: "5px" }}
                      />
                      {answer.votes}  
                    </div>
                    <Card.Text className="text-muted">
                      <span style={{ fontSize: "13px" }}>
                        {timeAgo(answer.createdAt)}
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
