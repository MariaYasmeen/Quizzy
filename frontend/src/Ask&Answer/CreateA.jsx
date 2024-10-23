import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { createAnswer } from "../services/apiQuestion";

const CreateAnswer = ({ questionId, onSuccess }) => {
  const [answerText, setAnswerText] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a payload matching the expected endpoint format
    const formData = {
      answerText: answerText, // Capturing answer text
      description: description, // Capturing description
    };

    try {
      const newAnswer = await createAnswer(formData); // Sending data to the server
      onSuccess(newAnswer); // Call the onSuccess prop to update the questionData in QDetails
      setAnswerText(""); // Clear input fields after submission
      setDescription(""); // Clear description after submission
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
