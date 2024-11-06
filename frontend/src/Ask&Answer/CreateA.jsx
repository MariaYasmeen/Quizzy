import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createAnswer } from "../services/quizUtils";
import { useTextEditor } from "../Hooks/useATextEditor";
 
const CreateAnswer = ({ questionId, onSuccess }) => {
  const { title, answerText, description, setAnswerText, setDescription, setTitle, resetForm, isCodeMode, toggleCodeMode } = useTextEditor();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { title, answerText, description };

    try {
      const newAnswer = await createAnswer({ data: formData, id: questionId });
      if (onSuccess) onSuccess(newAnswer);
      resetForm();
    } catch (error) {
      console.error("Failed to create answer:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Your Answer</h3>
      <Form onSubmit={handleSubmit}>
        <div className="text-editor-toolbar mb-2 editorbox">
          <button type="button" onClick={() => document.execCommand("bold")}>
            <b>B</b>
          </button>
          <button type="button" onClick={() => document.execCommand("italic")}>
            <i>I</i>
          </button>
          <button type="button" onClick={() => document.execCommand("underline")}>
            <u>U</u>
          </button>
          <button type="button" onClick={() => document.execCommand("insertUnorderedList")}>
            • List
          </button>
          <button type="button" onClick={toggleCodeMode} className="ms-2">
            <FontAwesomeIcon icon={faPlus} /> Code
          </button>
        </div>

        <Form.Group controlId="formAnswerText">
          <Form.Control
            as="textarea"
            rows={2}
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            required
            placeholder="Add your answer text here..."
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Control
            as="textarea"
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add your details or code here..."
            style={{
              fontFamily: isCodeMode ? "monospace" : "inherit",
              backgroundColor: isCodeMode ? "#f9f9f9" : "white",
              whiteSpace: isCodeMode ? "pre" : "normal",
              overflowWrap: "break-word",
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit Answer
        </Button>
      </Form>
    </Container>
  );
};

export default CreateAnswer;
