// src/services/fetchQuestions.js
import { fetchQuestions } from "../services/Q&AFETCH";

export const getQuestions = async () => {
  try {
    const data = await fetchQuestions();
    console.log("Fetched QA Data:", data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
