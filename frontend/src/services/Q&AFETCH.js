// api.js
import axios from "axios";

const URL = "http://localhost:3300/api/v1/qna/";
axios.defaults.withCredentials = true;

export async function fetchQuestions() {
  try {
    console.log("API is going to start...");
    const res = await axios.get(URL);
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

export async function fetchOneQuestion(id) {
  try {
    console.log("API is going to start...");
    const res = await axios.get(`${URL}/${id}`);
    console.log("API responses are of one Q&A:", res.data.data.data);
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
