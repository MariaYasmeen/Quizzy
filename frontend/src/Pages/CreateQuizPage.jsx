import React from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useCreateQuiz from "../features/quiz/useCreateQuiz"; // Assuming the hook is already available

const CreateQuizPage = () => {
  const { isLoading, createQuiz } = useCreateQuiz();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createQuiz(data, {
      onSuccess: () => {
        reset(); // Reset form after successful submission
      },
      onError: (error) => {
        console.error("Error creating quiz:", error);
      },
    });
  };

  return (
    <div className="container mt-4">
      <h2>Create a New Quiz</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="quizTitle">
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter quiz title"
            {...register("title", { required: "Quiz title is required" })}
          />
          {errors.title && <Alert variant="danger">{errors.title.message}</Alert>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="quizDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter quiz description"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && (
            <Alert variant="danger">{errors.description.message}</Alert>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="isPublic">
          <Form.Check type="checkbox" label="Public Quiz" {...register("isPublic")} />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" {...register("startDate", { required: "Start date is required" })} />
              {errors.startDate && (
                <Alert variant="danger">{errors.startDate.message}</Alert>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" {...register("endDate", { required: "End date is required" })} />
              {errors.endDate && (
                <Alert variant="danger">{errors.endDate.message}</Alert>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default CreateQuizPage;
