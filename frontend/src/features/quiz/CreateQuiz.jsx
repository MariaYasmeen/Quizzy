import { useState } from "react";
import { Button } from "react-bootstrap";
import QuizModal from "./QuizModal";

const CreateQuiz = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create Quiz
      </Button>

      <QuizModal showModal={showModal} handleClose={handleClose} />
    </div>
  );
};

export default CreateQuiz;