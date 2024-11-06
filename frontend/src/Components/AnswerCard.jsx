import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as solidThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as regularThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { handleAnswerVoteClick } from "../QAContext/voteUtils";
import { timeAgo } from "../services/timeago";

const AnswerCard = ({ answer, questionId, votedAnswers, setVotedAnswers, setQuestionData }) => {
  return (
    <Card className="p-3 shadow-sm">
      <Card.Body>
        <h5>{answer.answerText}</h5>
        <Card.Text style={{ fontSize: "14px" }}>
          {answer.description || "No description available."}
        </Card.Text>
        <div>
          <FontAwesomeIcon
            icon={votedAnswers[answer._id] ? solidThumbsUp : regularThumbsUp}
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
        <Card.Text className="text-muted" style={{ fontSize: "13px" }}>
          Answered by {answer.answeredBy.name || "Unknown"} | {timeAgo(answer.createdAt)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AnswerCard;
