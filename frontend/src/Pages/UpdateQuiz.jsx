import React, { useState } from "react";
import { updateQuiz } from "../services/quizUD";
import { Button, Form, Container } from "react-bootstrap";

const UpdateQuizForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = { title, description };

    try {
      const updatedQuiz = await updateQuiz(quizData);
      setMessage("Quiz updated successfully!");
      setTitle("");
      setDescription("");
      console.log("Updated quiz:", updatedQuiz);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Update Quiz</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new quiz title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter new quiz description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Update Quiz
        </Button>
      </Form>
      {message && <p className="text-success mt-3">{message}</p>}
      {error && <p className="text-danger mt-3">Error: {error}</p>}
    </Container>
  );
};

export default UpdateQuizForm;
