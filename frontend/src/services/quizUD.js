import axios from "axios";
const URL = `http://localhost:3300/api/v1/quizzes/myQuiz`;

axios.defaults.withCredentials = true;

export async function DeleteQuiz(quizId) {
  try {
    const res = await axios.delete(`${URL}/${quizId}`);
    if (res.status === 204) {
      console.log(`Successfully deleted quiz with ID: ${quizId}`);
      return true;
    }
  } catch (error) {
    console.error("Error occurred while deleting quiz:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to delete quiz.");
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
}
