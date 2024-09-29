// QuizModal.js
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCheckSquare,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import "./QuizModal.css"; // Import your CSS file
import { useParams } from "react-router-dom";
import useCreateQuestion from "./useCreateQuestion";

function QuestionModal({ showModal, handleClose }) {
  const { quizId } = useParams();
  const { isLoading, createQuestion } = useCreateQuestion(quizId);
  const { register, control, handleSubmit, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  const onSubmit = (data) => {
    createQuestion(data, {
      onSuccess: () => {
        handleClose();
        reset();
      },
    });
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Quiz Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Question:</Form.Label>
            <Form.Control
              type="text"
              {...register("questionText", { required: true })}
            />
          </Form.Group>

          <h3>Options:</h3>
          {fields.map((item, index) => (
            <div key={item.id} className="option-group">
              <Form.Control
                {...register(`options.${index}.text`, { required: true })}
                placeholder="Option Text"
              />
              <Form.Check
                type="checkbox"
                label=""
                {...register(`options.${index}.isCorrect`)}
                custom
                render={({ field }) => (
                  <div
                    className="checkbox-icon"
                    onClick={() => field.onChange(!field.value)}
                  >
                    <FontAwesomeIcon
                      icon={field.value ? faCheckSquare : faSquare}
                    />
                  </div>
                )}
              />
              <Button variant="danger" onClick={() => remove(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          ))}
          <Button
            variant="primary"
            onClick={() => append({ text: "", isCorrect: false })}
          >
            Add Option
          </Button>

          <Button variant="success" type="submit">
            {isLoading ? "submitting..." : "Submit Quiz"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default QuestionModal;
