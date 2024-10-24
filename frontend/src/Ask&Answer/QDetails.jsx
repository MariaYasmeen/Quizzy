import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneQuestion } from "../services/Q&AFETCH";
import { addVoteToA } from "../services/Q&APOST"; // Import the addVote function
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import Navbar from "../Components/Navbar";
import { timeAgo } from "../services/timeago";
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
  const [votedAnswers, setVotedAnswers] = useState({}); // Track votes for each answer

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

  const handleVoteClick = async (answerId) => {
    const hasVoted = votedAnswers[answerId];
    const newVoteState = !hasVoted;

    try {
      const data = { vote: newVoteState ? 1 : -1 };
      await addVoteToA({ data, quizId: "someQuizId", questionId });

      // Update local vote state
      setVotedAnswers((prevState) => ({
        ...prevState,
        [answerId]: newVoteState,
      }));

      // Update votes count locally
      setQuestionData((prevData) => ({
        ...prevData,
        answers: prevData.answers.map((answer) =>
          answer._id === answerId
            ? {
                ...answer,
                votes: answer.votes + (newVoteState ? 1 : -1),
              }
            : answer
        ),
      }));
    } catch (error) {
      console.error("Failed to update votes:", error);
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
            : questionData.askedBy?.name}{" "}
          | {questionData?.votes} {questionData?.votes === 1 ? "vote" : "votes"}{" "}
          | {timeAgo(questionData?.createdAt)}
        </Card.Text>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Answer this Question"}
        </button>

        {showForm && <CreateAnswer questionId={questionId} />}

        <p style={{ fontSize: "14px" }}>{questionData?.description}</p>

        {questionData.questionDocument.length > 0 && (
          <img
            src={questionData.questionDocument[0]}
            alt="Question related"
            style={{ width: "100%", maxWidth: "300px", marginTop: "10px" }}
          />
        )}

        <h5>Solutions:</h5>
        {Array.isArray(questionData.answers) && questionData.answers.length > 0 ? (
          <Row>
            {questionData.answers.map((answer) => (
              <Col key={answer._id} md={12} className="mb-3">
                <Card className="p-3 shadow-sm">
                  <Card.Body>
                    <h5>{answer.answerText}</h5>
                    <Card.Text>
                      {answer.description ? (
                        <p style={{ fontSize: "14px" }}>{answer.description}</p>
                      ) : (
                        <p>Description not available.</p>
                      )}
                    </Card.Text>
                    <div>
                      <FontAwesomeIcon
                        icon={
                          votedAnswers[answer._id]
                            ? solidThumbsUp
                            : regularThumbsUp
                        }
                        onClick={() => handleVoteClick(answer._id)}
                        style={{ cursor: "pointer", marginRight: "5px" }}
                      />
                      {answer.votes} {answer.votes === 1 ? "vote" : "votes"}
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
