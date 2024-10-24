import React, { useEffect, useState } from "react";
import { fetchQuestions } from "../services/Q&AFETCH";
import { Card, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { timeAgo } from "../services/timeago";
import { createSlug } from "../services/slug";
import { addVoteToQ } from "../services/Q&APOST";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as solidThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as regularThumbsUp } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

const AllQA = () => {
  const [qaData, setQaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votedQuestions, setVotedQuestions] = useState({}); // Track votes for each question

  useEffect(() => {
    const fetchQA = async () => {
      try {
        const data = await fetchQuestions();
        console.log("Fetched QA Data:", data);
        setQaData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQA();
  }, []);

  const handleVoteClick = async (questionId) => {
    // Toggle vote state
    const hasVoted = votedQuestions[questionId];
    const newVoteState = !hasVoted;

    try {
      // Update votes in the database
      const data = { vote: newVoteState ? 1 : -1 }; // 1 for upvote, -1 for downvote
      await addVoteToQ({ data, id: questionId });

      // Update local state
      setVotedQuestions((prevState) => ({
        ...prevState,
        [questionId]: newVoteState,
      }));

      // Update vote count in the local state
      setQaData((prevData) =>
        prevData.map((qa) =>
          qa._id === questionId
            ? {
                ...qa,
                votes: qa.votes + (newVoteState ? 1 : -1),
              }
            : qa
        )
      );
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

  return (
    <Container>
      <h5>Question & Answers</h5>
      {qaData &&
        qaData.map((qaData) => (
          <Card className="mb-3" key={qaData._id}>
            <Card.Body>
              <h5 style={{ color: "green", fontWeight: "300px" }}>
                <Link
                  to={`/questions/${qaData._id}/${createSlug(
                    qaData.questionText
                  )}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {qaData.questionText}
                </Link>
              </h5>
              <p style={{ fontSize: "14px" }}>
                {qaData.votes} {qaData.votes === 1 ? "vote" : "votes"} | 0
                answers | 3 views
              </p>
              <p>
                {qaData.description.length > 100
                  ? `${qaData.description.substring(0, 100)}...`
                  : qaData.description}
              </p>

              <div className="d-flex flex-wrap mt-2">
                {qaData.tags &&
                  qaData.tags.map((tag, index) => (
                    <span key={index} className="badge bg-primary me-1 mb-1">
                      {tag}
                    </span>
                  ))}
              </div>

              <div className="mt-2">
                <FontAwesomeIcon
                  icon={
                    votedQuestions[qaData._id] ? solidThumbsUp : regularThumbsUp
                  }
                  onClick={() => handleVoteClick(qaData._id)}
                  style={{ cursor: "pointer", marginRight: "5px" }}
                />
                {qaData.votes} {qaData.votes === 1 ? "vote" : "votes"}
              </div>

              <Card.Footer>
                <small className="text-muted">
                  Asked by{" "}
                  {Array.isArray(qaData.askedBy)
                    ? qaData.askedBy.map((user) => user.name).join(", ")
                    : qaData.askedBy.name}{" "}
                  | {timeAgo(qaData.createdAt)}
                </small>
              </Card.Footer>
            </Card.Body>
          </Card>
        ))}
    </Container>
  );
};

export default AllQA;
