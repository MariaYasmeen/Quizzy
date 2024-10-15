import axios from "axios";

const URL = "http://localhost:3300/api/v1/qna/ten-faq";
 axios.defaults.withCredentials = true;

export async function fetchQuestions() {
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