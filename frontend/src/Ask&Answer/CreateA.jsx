import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { createAnswer } from "../services/Q&APOST";

const CreateAnswer = ({ questionId, onSuccess }) => {
  const [answerText, setAnswerText] = useState("");
  const [description, setDescription] = useState("");
  console.log(questionId);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      answerText: answerText,
      description: description,
    };

    try {
      const newAnswer = await createAnswer({ data: formData, id: questionId });
      // onSuccess(newAnswer);
      setAnswerText("");
      setDescription("");
    } catch (error) {
      console.error("Failed to create answer:", error);
      // Handle error, e.g., show an alert or error message
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Submit Your Answer</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formAnswerText">
          <Form.Label column sm={2}>
            Answer:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              required
              placeholder="Type your answer here..."
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formDescription">
          <Form.Label column sm={2}>
            Description (optional):
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any additional details here..."
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit Answer
        </Button>
      </Form>
    </Container>
  );
};

export default CreateAnswer;
