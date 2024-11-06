import { useMutation } from "@tanstack/react-query";
import { createQuiz as createQuizApi } from "../services/quizUtils1";
import { useNavigate } from "react-router-dom";

function useCreateQuiz() {
  const navigate = useNavigate();
  const { isLoading, mutate: submitQuiz } = useMutation({
    mutationFn: createQuizApi,
    onSuccess: (data) => {
      const quizId = data.data._id;
      navigate(`/createquiz/${quizId}`);
      console.log("Quiz created successfully", data);
    },
    onError: (err) => {
      console.error("Error creating quiz:", err);
    },
  });

  return { isLoading, submitQuiz };
}

export default useCreateQuiz;
