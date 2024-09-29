import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const addQuestions = async ({ quizId, questions }) => {
  const url = `http://127.0.0.1:3300/api/v1/quizzes/${quizId}/questions`;
  return axios.post(url, { questions });
};

 

function useCreateQuestions() {
  const { mutate, isLoading } = useMutation({
    mutationFn: addQuestions,
    onSuccess: () => {
      console.log("Questions successfully added");
    },
    onError: (error) => {
      console.error("Error adding questions:", error);
    },
  });

  return { mutate, isLoading };
}

export default useCreateQuestions;
