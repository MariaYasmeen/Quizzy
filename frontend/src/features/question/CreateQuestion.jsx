import { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import QuestionModal from "./QuestionModal";

function CreateQuestion() {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add Question
      </Button>

      <QuestionModal showModal={showModal} handleClose={handleClose} />
    </div>
  );
}

export default CreateQuestion;
