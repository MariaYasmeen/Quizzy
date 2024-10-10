 export const calculateMarkedIndices = (questions, markedForReview) => {
    return questions
      .map((question, index) => (markedForReview[question._id] ? index : null))
      .filter(index => index !== null);
  };
  
  export const calculateUnattemptedIndices = (questions, userAnswers) => {
    return questions
      .map((question, index) => (userAnswers[question._id] ? null : index))
      .filter(index => index !== null);
  };
  
  export const toggleMarkForReview = (prevMarked, questionId) => {
    return {
      ...prevMarked,
      [questionId]: !prevMarked[questionId],
    };
  };
  
  export const navigateToQuestion = (setCurrentQuestionIndex, index) => {
    setCurrentQuestionIndex(index);
  };
  