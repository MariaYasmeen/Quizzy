import axios from "axios";
const URL = "http://localhost:3300/api/v1/users/signup";
axios.defaults.withCredentials = true;
export async function signup(data) {
  console.log(data);
  try {
    const res = await axios.post(URL, data);
    return res;
  } catch (error) {
    return error.data;
  }
}
