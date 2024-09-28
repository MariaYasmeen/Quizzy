import { useMutation } from "@tanstack/react-query";
import { createQuiz as createQuizApi } from "../../services/apiQuiz";

function useCreateQuiz() {
  const { isLoading, mutate: createQuiz } = useMutation({
    mutationFn: createQuizApi,
    onSuccess: (data) => {
      console.log("Quiz created successfully", data);
    },
    onError: (err) => {
      console.error("Error creating quiz:", err);
    },
  });

  return { isLoading, createQuiz };
}

export default useCreateQuiz;
