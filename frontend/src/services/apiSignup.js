import axios from "axios";

const URL = "http://localhost:3300/api/v1/users/signup";
http://localhost:3300/api/v1/qna/66dea40cf45bbab14aca59f6/vote
axios.defaults.withCredentials = true;

export async function signup(data) {
  console.log(data);
  try {
    const res = await axios.post(URL, data);
    return res;
  } catch (error) {
     if (error.response) {
       return error.response.data;
    } else if (error.request) {
       return { message: "No response from server." };
    } else {
       return { message: error.message };
    }
  }
}