import axios from "axios";
axios.defaults.withCredentials = true;
const URL = "http://localhost:3300/api/v1/quizzes/";
export async function createQuestion({ data, quizId }) {
  try {
    const res = await axios.post(`${URL}${quizId}/questions`, data);
    console.log(res.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}
