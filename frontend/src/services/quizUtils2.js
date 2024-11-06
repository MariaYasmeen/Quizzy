 
// Function to load quiz details (assuming an API call)
export const loadQuizDetails = async (quizId, setQuizDetails, setError, setLoading) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/quiz/${quizId}`);
      const data = await response.json();
      setQuizDetails(data);
    } catch (error) {
      setError("Failed to load quiz details.");
    } finally {
      setLoading(false);
    }
  };
  
  // Function to calculate the indices of marked questions
  export const calculateMarkedIndices = (questions, markedForReview) => {
    return questions
      .map((question, index) => (markedForReview[question._id] ? index : null))
      .filter((index) => index !== null);
  };
  
  // Function to calculate the indices of unattempted questions
  export const calculateUnattemptedIndices = (questions, userAnswers) => {
    return questions
      .map((question, index) => (userAnswers[question._id] === undefined ? index : null))
      .filter((index) => index !== null);
  };
  
  // Function to toggle mark for review
  export const toggleMarkForReview = (markedForReview, questionId) => {
    const newMarked = { ...markedForReview };
    newMarked[questionId] = !newMarked[questionId];
    return newMarked;
  };
  
  // Function to navigate to a specific question
  export const navigateToQuestion = (setCurrentQuestionIndex, index) => {
    setCurrentQuestionIndex(index);
  };
  