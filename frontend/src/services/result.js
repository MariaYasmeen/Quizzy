import axios from "axios";
axios.defaults.withCredentials = true;
const URL2 =
  "http://localhost:3300/api/v1/quizzes/66df08041ca2a346917eaa0e/take";

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

    console.log("Sending result payload:", resultPayload);

    const res = await axios.post(URL2, resultPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Result is submitted successfully:", res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Server respond a  error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error in request setup:", error.message);
    }
    throw error;
  }
}

export const fetchQuizResults = async (quizId) => {
  try {
    const response = await axios.get(
      `http://localhost:3300/api/v1/quizzes/${quizId}/results`
    );
    console.log("", response.data);

    return response.data.result;
  } catch (err) {
    console.error("Error fetching all results:", err);
    throw new Error("Failed to fetch the results");
  }
};
