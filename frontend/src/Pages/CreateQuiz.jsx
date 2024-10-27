import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import Navabr from "../Components/Navbar";
import useCreateQuiz from "../features/quiz/useCreateQuiz";
import { useForm } from "react-hook-form";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

const CreateQuizPage = () => {
  const { isLoading, createQuiz } = useCreateQuiz();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Function to save form data to localStorage
  const saveFormDataToLocalStorage = (data) => {
    localStorage.setItem("quizFormData", JSON.stringify(data));
  };

  // Load form data from localStorage
  const loadFormDataFromLocalStorage = () => {
    const savedData = localStorage.getItem("quizFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Set values in the form
      Object.keys(parsedData).forEach((field) => {
        setValue(field, parsedData[field]);
      });
    }
  };

  // Debounce saving data to localStorage for better performance
  const handleInputChange = (field, value) => {
    const savedData = localStorage.getItem("quizFormData") || "{}";
    const parsedData = JSON.parse(savedData);
    parsedData[field] = value;
    saveFormDataToLocalStorage(parsedData);
  };

  // Load form data on component mount
  useEffect(() => {
    loadFormDataFromLocalStorage();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    createQuiz(data, {
      onSuccess: () => {
        reset(); // Reset form after successful submission
        localStorage.removeItem("quizFormData"); // Clear saved data after submission
      },
      onError: (error) => {
        console.error("Error creating quiz:", error);
      },
    });
  };

  return (
    <>
     <Navbar />
         <Sidebar />
         <main className="flex-grow-1 overflow-auto" style={{ marginLeft: '200px', padding: '20px' }}>

      <div className="container mt-2">
        <h2>Create a New Quiz</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
            {errors.title && (
              <Alert variant="danger">{errors.title.message}</Alert>
            )}
          </Form.Group>

          <Form.Group className="mb-1" controlId="quizDescription">
             <Form.Control
              as="textarea"
              rows={3}
              className="inputfeild"
              placeholder="Enter quiz description"
              {...register("description", {
                required: "Description is required",
                onChange: (e) =>
                  handleInputChange("description", e.target.value),
              })}
            />
            {errors.description && (
              <Alert variant="danger">{errors.description.message}</Alert>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="isPublic">
            <Form.Check
              type="checkbox"
              label="Public Quiz"
              {...register("isPublic", {
                onChange: (e) =>
                  handleInputChange("isPublic", e.target.checked),
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
                    onChange: (e) =>
                      handleInputChange("startDate", e.target.value),
                  })}
                />
                {errors.startDate && (
                  <Alert variant="danger">{errors.startDate.message}</Alert>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  className="inputfeild"
                  {...register("endDate", {
                    required: "End date is required",
                    onChange: (e) =>
                      handleInputChange("endDate", e.target.value),
                  })}
                />
                {errors.endDate && (
                  <Alert variant="danger">{errors.endDate.message}</Alert>
                )}
              </Form.Group>
            </Col>
          </Row>

          <button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Wait..." : "Next"}
          </button>
        </Form>
      </div>
      </main>
    </>
  );
};

export default CreateQuizPage;
