 
import React from "react";
import { Card, Col } from "react-bootstrap";
import AnimatedButton from "../StyleComponents/AnimBtn";

const QuizCard = ({ quiz, onClick1,onClick2, getRandomColor ,btntxt1, btntxt2}) => {
  return (
    <Col lg={4} md={6} sm={12} className="mb-3" key={quiz._id}>
      <Card
        className="h-100"
        style={{
          backgroundColor: getRandomColor(), // Set random background color
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
             onClick={onClick2}
            color="black"
            borderColor="grey"
            shadowColor="grey"
          >{btntxt2}</button>
      </Card>
    </Col>
  );
};

export default QuizCard;
