 
import axios from "axios";
const URL = "http://localhost:3300/api/v1/qna";
export async function createQuestion(data) {
  try {
    const res = await axios.post(URL, data);
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    throw error.data;
  }
}


 const URL2 = "http://localhost:3300/api/v1/qna/67189be0f95d665e0baacb17/answer";
export async function createAnswer(data) {
  try {
    const res = await axios.post(URL2, data);
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    throw error.data;
  }
}