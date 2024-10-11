import axios from "axios";

const URL = "http://localhost:3300/api/v1/quizzes/myQuiz";
axios.defaults.withCredentials = true;

export async function fetchPrivateQuizzes() {
  try {
    console.log("API is going to start...");
    const res = await axios.get(URL);
    console.log("API responses are:", res.data);

    // Filter quizzes that are private (where isPublic is false)
    const privateQuizzes = res.data.data.data.filter(quiz => !quiz.isPublic);
    
    console.log("Private quizzes only:", privateQuizzes);

    return privateQuizzes; // Return only private quizzes
  } catch (error) {
    console.error("Error appeared in fetching all quizzes:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch ");
    } else {
      throw new Error("Unknown error");
    }
  }
}
