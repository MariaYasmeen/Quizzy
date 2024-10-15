 
export const calculateScore = (quizDetails, userAnswers) => {
  let score = 0;

  quizDetails.questions.forEach((question) => {
    if (!question || !question.options) return;  

    const correctOptions = question.options.filter(option => option.isCorrect).map(option => option._id);
    const userAnswer = userAnswers[question._id];

    if (userAnswer && correctOptions.includes(userAnswer)) {
      score += 1;
    }
  });

  return score;
};
 
export const handleChange = (questionId, optionId, setUserAnswers) => {
  setUserAnswers((prevAnswers) => ({
    ...prevAnswers,
    [questionId]: optionId,
  }));
  
};

// Handle moving to the next question
export const handleNextQuestion = (setCurrentQuestionIndex) => {
  setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
};

// Handle moving to the previous question
export const handlePrevQuestion = (setCurrentQuestionIndex) => {
  setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
};
