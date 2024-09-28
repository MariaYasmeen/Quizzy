import { useMutation } from "@tanstack/react-query";
import { createQuiz as createQuizApi } from "../../services/apiQuiz";

function useCreateQuiz() {
  const { isLoading, mutate: createQuiz } = useMutation({
    mutationFn: createQuizApi,
    onSuccess: () => {
      console.log("success");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return { isLoading, createQuiz };
}

export default useCreateQuiz;
