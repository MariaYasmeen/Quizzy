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