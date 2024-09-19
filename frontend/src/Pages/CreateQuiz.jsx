import React, { useState } from 'react';

const CreateQuiz = () => {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    questions: [''],
    isPublic: false,
    startDate: '',
    endDate: ''
  });

  const [questionData, setQuestionData] = useState({
    questionText: '',
    options: [
      { text: '', isCorrect: false },
    ]
  });

  const [responseMessage, setResponseMessage] = useState('');

  // Handle quiz input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]: value
    });
  };

  // Handle question input changes
  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value
    });
  };

  // Handle option changes for questions
  const handleOptionChange = (index, field, value) => {
    const newOptions = [...questionData.options];
    newOptions[index][field] = value;
    setQuestionData({ ...questionData, options: newOptions });
  };

  // Add new option for the question
  const addOption = () => {
    setQuestionData({
      ...questionData,
      options: [...questionData.options, { text: '', isCorrect: false }]
    });
  };

  // Remove an option for the question
  const removeOption = (index) => {
    const newOptions = questionData.options.filter((_, i) => i !== index);
    setQuestionData({ ...questionData, options: newOptions });
  };

  // Submit handler for quiz creation
  const handleSubmitQuiz = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:3300/api/v1/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage(`Quiz created successfully: ${data.data.quiz.title}`);
      } else {
        setResponseMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setResponseMessage('Failed to create quiz');
      console.error(error);
    }
  };

  // Submit handler for question creation
  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    const quizId = '66df08041ca2a346917eaa0e'; // Quiz ID for which the question is being added

    try {
      const response = await fetch(`http://127.0.0.1:3300/api/v1/quizzes/${quizId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage(`Question created successfully: ${data.data.question.questionText}`);
      } else {
        setResponseMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setResponseMessage('Failed to create question');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create a Quiz</h2>
      <form onSubmit={handleSubmitQuiz}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={quizData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Public Quiz:</label>
          <input
            type="checkbox"
            name="isPublic"
            checked={quizData.isPublic}
            onChange={(e) => setQuizData({ ...quizData, isPublic: e.target.checked })}
          />
        </div>

        <div>
          <label>Start Date:</label>
          <input
            type="datetime-local"
            name="startDate"
            value={quizData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>End Date:</label>
          <input
            type="datetime-local"
            name="endDate"
            value={quizData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Create Quiz</button>
      </form>

      <h2>Add a Question</h2>
      <form onSubmit={handleSubmitQuestion}>
        <div>
          <label>Question Text:</label>
          <input
            type="text"
            name="questionText"
            value={questionData.questionText}
            onChange={handleQuestionChange}
            required
          />
        </div>

        <div>
          <label>Options:</label>
          {questionData.options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Option text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                required
              />
              <label>
                Correct:
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                />
              </label>
              <button type="button" onClick={() => removeOption(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addOption}>Add Option</button>
        </div>

        <button type="submit">Create Question</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default CreateQuiz;
