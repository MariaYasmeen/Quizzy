import React, { useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { useQuiz } from '../../Context/QuizContext';
import useCreateQuiz from "./useCreateQuiz";
import useCreateQuestions from "./useCreateQuestions";
import Navbar from "../../Components/Navbar";
import QuestionForm from '../../CreateQuiz/QuestionForm';
import QuizInputs from '../../CreateQuiz/QuizInputs';

const CreateQuizForm = () => {
  const { 
    title, setTitle, 
    description, setDescription, 
    isPublic, setIsPublic, 
    startDate, setStartDate, 
    endDate, setEndDate 
  } = useQuiz();

  const { createQuiz } = useCreateQuiz();
  const { mutate: addQuestions } = useCreateQuestions();
  
  const [loading, setLoading] = useState(false);
  
  const { handleSubmit, control, register, reset } = useForm({
    defaultValues: {
      questions: [{ questionText: "", options: [{ text: "", isCorrect: false }] }],
    },
  });

  const { fields: questions, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const quizData = {
        title,
        description,
        isPublic,
        startDate,
        endDate,
      };

      createQuiz(quizData, {
        onSuccess: (quizResponse) => {
          console.log("Quiz created successfully", quizResponse);

          const quizId = quizResponse.data._id;

          addQuestions({ quizId, questions: data.questions }, {
            onSuccess: () => {
              console.log("Questions successfully added");
              alert("Quiz and questions added successfully!");
              reset();
            },
            onError: (error) => {
              console.error("Error adding questions:", error);
              alert("There was an error adding questions.");
            },
          });
        },
        onError: (error) => {
          console.error("Error creating quiz:", error);
          alert("There was an error creating the quiz.");
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    } catch (error) {
      console.error("Error in submission:", error);
      alert("Unexpected error during quiz creation.");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <QuizInputs 
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

         <div className="mb-4">
          <h5>Questions</h5>
          {questions.map((question, index) => (
            <div key={question.id} className="mb-3">
              <QuestionForm
                register={register}
                control={control}
                questionIndex={index}
                remove={() => remove(index)}  
              />
            </div>
          ))}
        </div>

         <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit Quiz & Questions"}
        </button>
      </form>
    </>
  );
};

export default CreateQuizForm;
