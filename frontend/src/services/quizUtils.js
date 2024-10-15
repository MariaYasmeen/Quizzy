import { fetchQuizDetails } from "../services/publicQuiz"; // Reused from original code
import axios from "axios";

const URL = "http://localhost:3300/api/v1/quizzes";
 axios.defaults.withCredentials = true;
export async function DeletePrivateQuizzes() {
  try {
    console.log("API is going to start...");
    const res = await axios.get(URL);
    console.log("API responses are:", res.data);
    return res.data.data.data;
  } catch (error) {
    console.error("Error appeared in fetching all quizzes:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch ");
    } else {
      throw new Error("  unknown error");
    }
  }
}
export const loadQuizDetails = async (quizId, setQuizDetails, setError, setLoading) => {
  setLoading(true);
  try {
    const quiz = await fetchQuizDetails(quizId);
    setQuizDetails(quiz);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
export const softColors = [
  "#f8f9fa",
  "#f5e1da",
  "#e3fdfd",
  "#ffebcc",
  "#fff1e6",
  "#d4f1f4",
  "#ffe6e6",
  "#e0f7fa",
  "#f3e5f5",
];

export const getRandomColor = () => {
  return softColors[Math.floor(Math.random() * softColors.length)];
}; 
 
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
  


  