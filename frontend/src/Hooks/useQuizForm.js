 import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage } from "../services/quizUtils"; 

const useQuizForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    const savedData = loadFromLocalStorage("quizFormData");
    Object.keys(savedData).forEach((field) => {
      setValue(field, savedData[field]);
    });
  }, [setValue]);

  const handleInputChange = (field, value) => {
    const savedData = loadFromLocalStorage("quizFormData");
    savedData[field] = value;
    saveToLocalStorage("quizFormData", savedData);
  };

  const onSubmit = (data, createQuiz, resetForm) => {
    createQuiz(data, {
      onSuccess: () => {
        resetForm();
        removeFromLocalStorage("quizFormData");
      },
      onError: (error) => {
        console.error("Error creating quiz:", error);
      },
    });
  };

  return { handleSubmit, register, errors, handleInputChange, onSubmit, reset };
};

export default useQuizForm;
