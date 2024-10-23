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
  console.log(data);
  const URL2 = `http://localhost:3300/api/v1/qna/${id}/answer`;
  try {
    const res = await axios.post(URL2, data);
    return res.data.data;
  } catch (error) {
    throw error.data;
  }
}
