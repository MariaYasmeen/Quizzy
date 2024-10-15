import axios from "axios";

axios.defaults.withCredentials = true;

export async function DeleteQuiz(quizId) {
  const URL = `http://127.0.0.1:3300/api/v1/quizzes/${quizId}`;
  try {
    console.log(`Attempting to delete quiz with ID: ${quizId}...`);
    const res = await axios.delete(URL);
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
