import axios from "axios";

const URL2 = "http://localhost:3300/api/v1/quizzes/66df08041ca2a346917eaa0e/take";

export async function submitQuizResult(quizId, studentId, answers, score) {
  try {
    const resultPayload = {
      quiz: quizId,
      student: studentId,
      answers: answers.map((answer) => ({
        question: answer.questionId,
        selectedOption: answer.selectedOption,
        isCorrect: answer.isCorrect,
      })),
      score: score,
    };

    const res = await axios.post(URL2, resultPayload);
    console.log("Result submitted:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error submitting quiz result:", error);
    throw error;
  }
}


 
export const fetchQuizResults = async (quizId) => {
  try {
    const response = await axios.get(`http://localhost:3300/api/v1/quizzes/${quizId}/results`, { timeout: 5000 });
    return response.data.result; // Return the results directly
  } catch (err) {
    console.error("Error fetching results:", err);
    throw new Error('Failed to fetch results');
  }
};
