import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
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
      <h3 className="mb-3">  Your Answer</h3>
      <Form onSubmit={handleSubmit}>         

        <div className="text-editor-toolbar mb-2 editorbox">
          <button variant="light" onClick={() => formatText('bold')}>
            <b>B</b>
          </button>
          <button variant="light" onClick={() => formatText('italic')}>
            <i>I</i>
          </button>
          <button variant="light" onClick={() => formatText('underline')}>
            <u>U</u>
          </button>
          <button variant="light" onClick={() => formatText('insertUnorderedList')}>
            • List
          </button>
         
          <button variant="light" onClick={() => formatText('insertCode')}>
            Code
          </button>
        </div>

        <Form.Group  controlId="formAnswerText">
        <Form.Control
             contentEditable
            className="  inputfeild"
            rows={2}
            value={answerText}
            onInput={(e) => setAnswerText(e.currentTarget.innerText)}
            required
            placeholder="Add your Title here..."

           />
        </Form.Group>
 

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

        <button variant="primary" type="submit" className="mt-3">
          Submit Answer
        </button>
      </Form>
    </Container>
  );
};

export default CreateAnswer;

       
        
        