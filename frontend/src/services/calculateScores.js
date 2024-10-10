// quizUtils.js

// Calculate the quiz score based on user answers
export const calculateScore = (quizDetails, userAnswers) => {
  let score = 0;

  quizDetails.questions.forEach((question) => {
    const selectedAnswer = userAnswers[question._id];
    const correctAnswers = question.options
      .filter((option) => option.isCorrect)
      .map((option) => option._id);

    if (correctAnswers.includes(selectedAnswer)) {
      score += 1;
    }
  });

  return score;
};

// Handle input change for selected options
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
