// src/Pages/CreateQuiz.jsx
import React from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import useCreateQuiz from "../Hooks/useCreateQuiz";
import useQuizForm from "../Hooks/useQuizForm";
import { createQuiz } from "../services/quizUtils1";

const CreateQuizPage = () => {
  const { isLoading } = useCreateQuiz();
  const {
    handleSubmit,
    register,
    errors,
    handleInputChange,
    onSubmit,
    reset,
  } = useQuizForm();

  const handleQuizSubmit = (data) => {
    onSubmit(data, createQuiz, reset);  // Pass the createQuiz function
  };

  return (
    <main className="flex-grow-1 overflow-auto">
      <div className="container mt-2">
        <h2>Create a New Quiz</h2>
        <Form onSubmit={handleSubmit(handleQuizSubmit)}>
          <Form.Group className="mb-3" controlId="quizTitle">
            <Form.Control
              className="inputfeild"
              type="text"
              placeholder="Enter quiz title"
              {...register("title", {
                required: "Quiz title is required",
                onChange: (e) => handleInputChange("title", e.target.value),
              })}
            />
            {errors.title && <Alert variant="danger">{errors.title.message}</Alert>}
          </Form.Group>

          <Form.Group className="mb-1" controlId="quizDescription">
            <Form.Control
              as="textarea"
              rows={3}
              className="inputfeild"
              placeholder="Enter quiz description"
              {...register("description", {
                required: "Description is required",
                onChange: (e) => handleInputChange("description", e.target.value),
              })}
            />
            {errors.description && <Alert variant="danger">{errors.description.message}</Alert>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="isPublic">
            <Form.Check
              type="checkbox"
              label="Public Quiz"
              {...register("isPublic", {
                onChange: (e) => handleInputChange("isPublic", e.target.checked),
              })}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  className="inputfeild"
                  type="date"
                  {...register("startDate", {
                    required: "Start date is required",
                    onChange: (e) => handleInputChange("startDate", e.target.value),
                  })}
                />
                {errors.startDate && <Alert variant="danger">{errors.startDate.message}</Alert>}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  className="inputfeild"
                  type="date"
                  {...register("endDate", {
                    required: "End date is required",
                    onChange: (e) => handleInputChange("endDate", e.target.value),
                  })}
                />
                {errors.endDate && <Alert variant="danger">{errors.endDate.message}</Alert>}
              </Form.Group>
            </Col>
          </Row>

          <button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Wait..." : "Next"}
          </button>
        </Form>
      </div>
    </main>
  );
};

export default CreateQuizPage;
