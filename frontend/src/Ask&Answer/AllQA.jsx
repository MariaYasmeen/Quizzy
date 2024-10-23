import React, { useEffect, useState } from "react";
import { fetchQuestions } from "../services/getAllQA";
import { Card, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { timeAgo } from "../services/timeago";
import { createSlug } from "../services/slug";

const AllQA = () => {
  const [qaData, setQaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <h5 style={{ color: "lightblue", fontWeight: "300px" }}>
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
