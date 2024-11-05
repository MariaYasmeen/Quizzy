import React from "react";
import { Card, Col } from "react-bootstrap";
import AnimatedButton from "../StyleComponents/AnimBtn";

const QuizCard = ({
  quiz,
  onClick1,
  onClick2,
  onClick3,
  getRandomColor,
  btntxt1,
  btntxt2,
  btntxt3,
}) => {
  return (
    <Col lg={6} md={2} sm={10} className="mb-3" key={quiz._id}>
      <Card
        className="h-100"
        style={{
          backgroundColor: getRandomColor(),
        }}
      >
        <Card.Body className="d-flex flex-column">
          <Card.Title>{quiz.title}</Card.Title>
          <Card.Text>{quiz.description}</Card.Text>
          <AnimatedButton
            text={btntxt1}
            onClick={onClick1}
            color="black"
            borderColor="grey"
            shadowColor="grey"
          />
        </Card.Body>
        <button
          onClick={onClick3}
          color="black"
          borderColor="grey"
          shadowColor="grey"
        >
          {btntxt3}
        </button>
        <button
          onClick={onClick2}
          color="black"
          borderColor="grey"
         >
          {btntxt2}
        </button>

      </Card>
    </Col>
  );
};

export default QuizCard;
