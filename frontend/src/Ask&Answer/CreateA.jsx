import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { createAnswer } from "../services/Q&APOST";

const CreateAnswer = ({ questionId, onSuccess }) => {
  const [answerText, setAnswerText] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: title,
      answerText: answerText,
      description: description,
    };

    try {
      const newAnswer = await createAnswer({ data: formData, id: questionId });
      if (onSuccess) {
        onSuccess(newAnswer);  
      }
      setTitle("");
      setAnswerText("");
      setDescription("");
    } catch (error) {
      console.error("Failed to create answer:", error);
    }
  };

  const formatText = (command) => {
    document.execCommand(command, false, null);
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Your Answer</h3>
      <Form onSubmit={handleSubmit}>
        <div className="text-editor-toolbar mb-2 editorbox">
          <button type="button" onClick={() => formatText("bold")}>
            <b>B</b>
          </button>
          <button type="button" onClick={() => formatText("italic")}>
            <i>I</i>
          </button>
          <button type="button" onClick={() => formatText("underline")}>
            <u>U</u>
          </button>
          <button type="button" onClick={() => formatText("insertUnorderedList")}>
            • List
          </button>
          <button type="button" onClick={() => formatText("insertCode")}>
            Code
          </button>
        </div>

  

        {/* Answer Text Field */}
        <Form.Group controlId="formAnswerText">
          <Form.Control
            as="textarea"
            className="inputfeild"
            rows={2}
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            required
            placeholder="Add your answer text here..."
          />
        </Form.Group>

        {/* Description Field */}
        <Form.Group controlId="formDescription">
          <Form.Control
            as="textarea"
            rows={8}
            className="inputfeild"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add your details here..."
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
