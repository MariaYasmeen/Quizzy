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


  
const URL1 = "http://localhost:3300/api/v1/quizzes/myQuiz/670faff626127d6c90b2ca95";
 axios.defaults.withCredentials = true;

export async function updateQuiz() {
  try {
    console.log("API is going to start...");
    const res = await axios.get(URL1);
    console.log("API responses are:", res.data.data.data);
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
