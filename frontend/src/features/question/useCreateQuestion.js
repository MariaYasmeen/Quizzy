import { useMutation } from "@tanstack/react-query";
import { createQuestion as createQuestionApi } from "../../services/apiQuestion";

function useCreateQuestion(quizId) {
  const { isLoading, mutate: createQuestion } = useMutation({
    mutationFn: (data) => createQuestionApi({ data, quizId }),
    onSuccess: () => {
      console.log("created");
    },
    onError: () => {
      console.log("not created");
    },
  });

  return { isLoading, createQuestion };
}

export default useCreateQuestion;
