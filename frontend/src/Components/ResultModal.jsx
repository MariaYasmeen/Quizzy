import React from "react";
import { Modal, Button } from "react-bootstrap";

const ResultModal = ({ show, handleClose, score, totalQuestions }) => {
  const percentage = ((score / totalQuestions) * 100).toFixed(2);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Quiz Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You answered {score} out of {totalQuestions} questions correctly.</p>
        <p>Your percentage: {percentage}%</p>
      </Modal.Body>
      <Modal.Footer>
         <button onClick={handleClose}> </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultModal;
