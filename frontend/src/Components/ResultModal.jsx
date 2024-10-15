import React from "react";
import { Modal, Button } from "react-bootstrap";

const ResultModal = ({ show, handleClose, score, totalQuestions }) => {
  const percentage = ((score / totalQuestions) * 100).toFixed(2);

  // Function to render a message based on the percentage
  const renderMessage = (percentage) => {
    if (percentage >= 90) {
      return <p className="text-center">Excellent!</p>;
    } else if (percentage >= 80) {
      return <p className="text-center">Great work!</p>;
    } else if (percentage >= 70) {
      return <p className="text-center">Good effort!</p>;
    } else if (percentage >= 60) {
      return <p className="text-center">Not bad, but you can do better!</p>;
    } else {
      return <p className="text-center">You need to work harder! Keep trying!</p>;
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3 className="text-center p-4">{percentage}%</h3>
        <p className="text-center">Score: {score} / {totalQuestions}</p>
        
        {/* Conditional message rendering */}
        {renderMessage(percentage)}
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultModal;
