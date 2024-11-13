import React from "react";
import Navbar from "../Components/Navbar";
import { Button, Form } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import useCreateQuestion from "./useCreateQuestion";

function QuestionPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { isLoading, createQuestion } = useCreateQuestion(quizId);
  const { register, control, handleSubmit, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = (data) => {
    createQuestion(data, {
      onSuccess: () => {
        reset();
         navigate(`/createquiz/${quizId}`);
      },
    });
  };

  const handleBack = () => {
    navigate("/createquizpage");
  };

  return (
    <>
      <Navbar />
      <div className="question-page-container container">
        <h1>Create a Quiz Question</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Question:</Form.Label>
            <Form.Control
              type="text"
              {...register("questionText", { required: true })}
            />
          </Form.Group>

          <h3>Options:</h3>
          {fields.map((item, index) => (
            <div key={item.id} className="option-group">
              <Form.Control
                {...register(`options.${index}.text`, { required: true })}
                placeholder="Option Text"
              />
              <Form.Check
                type="checkbox"
                label=""
                {...register(`options.${index}.isCorrect`)}
                custom
                render={({ field }) => (
                  <div
                    className="checkbox-icon"
                    onClick={() => field.onChange(!field.value)}
                  >
                    <FontAwesomeIcon
                      icon={field.value ? faCheckSquare : faSquare}
                    />
                  </div>
                )}
              />
              <Button variant="danger" onClick={() => remove(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          ))}
          <Button
            variant="primary"
            onClick={() => append({ text: "", isCorrect: false })}
          > Add Options </Button>
          <button variant="success" type="submit" className="">
            {isLoading ? "Adding..." : "Add another Question"}
          </button>
          
          
        </Form>
      </div>
    </>
  );
}

export default QuestionPage;
