import React, { useContext } from "react";
import { QAContext } from "../QAContext/QAContext";
import { UserContext } from "../Context/userContext";
import { Card, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { timeAgo } from "../services/timeago";
import { createSlug } from "../services/slug";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as solidThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as regularThumbsUp } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

const AllQA = () => {
  const { qaData, loading, error, votedQuestions, handleVoteClick } = useContext(QAContext);
  const { user } = useContext(UserContext); 

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
    <div>
      <h3>All Questions</h3>
      <p>{qaData.length} {qaData.length === 1 ? "Question" : "Questions"}</p>
      <Link variant="primary" to="/createquestion" className="mb-2">Ask Question</Link>

      {qaData &&
        qaData
          .slice()  
          .reverse()  
          .map((qa) => (
            <div className="mb-2 qsbox" key={qa._id}>
              <Card>
                <p className="title">
                  <Link
                    to={`/questions/${qa._id}/${createSlug(qa.questionText)}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {qa.questionText}
                  </Link>
                </p>

                <p className="description">
                  {qa.description.length > 100
                    ? `${qa.description.substring(0, 100)}...`
                    : qa.description}
                </p>

                <div className="d-flex flex-wrap mt-2">
                  {qa.tags &&
                    qa.tags.map((tag, index) => (
                      <span key={index} className="badge tagsbox me-1 mb-1">
                        {tag}
                      </span>
                    ))}
                </div>
                <p style={{ fontSize: "14px" }}>
                  {qa.votes} {qa.votes === 1 ? "vote" : "votes"} | {qa.answers.length}{" "}
                  {qa.answers.length === 1 ? "answer" : "answers"} | {qa.view} views
                </p>
                <div>
                  <FontAwesomeIcon
                    icon={votedQuestions[qa._id] ? solidThumbsUp : regularThumbsUp}
                    onClick={() => handleVoteClick(qa._id)}
                    style={{ cursor: "pointer", marginRight: "5px" }}
                  />
                  {qa.votes}
                </div>

                <Card.Footer>
                  <small className="text-muted">
                    Asked by {user?.name || "Anonymous"} | {timeAgo(qa.createdAt)}
                  </small>
                </Card.Footer>
              </Card>
            </div>
          ))}
    </div>
  );
};

export default AllQA;
