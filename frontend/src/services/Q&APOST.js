import axios from "axios";
const URL = "http://localhost:3300/api/v1/qna";
export async function createQuestion(data) {
  try {
    const res = await axios.post(URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  } catch (error) {
    throw error.data;
  }
}

export async function createAnswer({ data, id }) {
  console.log("Data being sent to backend:", data);
  const URL1 = `http://localhost:3300/api/v1/qna/${id}/answer`;
  try {
    const res = await axios.post(URL1, data);
    console.log("Backend response:", res.data);
    return res.data.data;
  } catch (error) {
    console.error("Error posting answer:", error);
    throw error;
  }
}

export async function addVoteToQ({ data, id }) {
  console.log(data);
  const URL2 = `http://localhost:3300/api/v1/qna/${id}/vote`;
  try {
    const res = await axios.post(URL2, data);
    return res.data.data;
  } catch (error) {
    throw error.data;
  }
}

export async function addVoteToA({ data, id, questionId }) {
  console.log(data);
  const URL2 = `http://localhost:3300/api/v1/qna/${questionId}/answer/${id}/vote`;
  try {
    const res = await axios.post(URL2, data);
    return res.data.data;
  } catch (error) {
    throw error.data;
  }
}
