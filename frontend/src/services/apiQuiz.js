import axios from "axios";
const URL = "http://localhost:3300/api/v1/quizzes";
export async function createQuiz(data) {
  try {
    const res = await axios.post(URL, data);
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    throw error.data;
  }
}
