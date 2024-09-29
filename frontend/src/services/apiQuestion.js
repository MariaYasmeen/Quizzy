import axios from "axios";
const URL = "http://localhost:3300/api/v1/quizzes";
export async function createQuestion({ data, quizId }) {
  try {
    const res = await axios.post(`${URL}/${quizId}/questions`, data);
    return res.data.data;
  } catch (error) {
    throw error.data;
  }
}
