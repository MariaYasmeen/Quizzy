 import React from 'react';

const QuizInputs = ({ title, setTitle, description, setDescription, isPublic, setIsPublic, startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <>
       <div className="form-group mb-4">
        <label htmlFor="quizTitle">Quiz Title</label>
        <input
          type="text"
          className="form-control"
          id="quizTitle"
          placeholder="Enter quiz title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

       <div className="form-group mb-3">
        <label htmlFor="quizDescription">Description</label>
        <textarea
          className="form-control"
          id="quizDescription"
          rows="3"
          placeholder="Enter quiz description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

       <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="isPublic"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="isPublic">
          Public Quiz
        </label>
      </div>

       <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>
    </>
  );
};

export default QuizInputs;
