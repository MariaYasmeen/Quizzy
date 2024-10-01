 import React from 'react';
import QuestionModal from './QuestionModal';

function QuestionModalWrapper() {
  const handleClose = () => {
   };

  return (
    <QuestionModal showModal={true} handleClose={handleClose} />
  );
}

export default QuestionModalWrapper;
