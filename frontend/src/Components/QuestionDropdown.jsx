// QuestionDropdown.js
import React from 'react';

const QuestionDropdown = ({ indices, title, navigateToQuestion, buttonStyle }) => {
  if (indices.length === 0) return null;

  return (
    <div className="dropdown">
      <button
        className={`btn ${buttonStyle} dropdown-toggle`}
        type=" "
        id={`${title.replace(" ", "").toLowerCase()}Dropdown`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {title}
      </button>
      <ul className="dropdown-menu" aria-labelledby={`${title.replace(" ", "").toLowerCase()}Dropdown`}>
        {indices.map((index) => (
          <li key={index} className="dropdown-item" onClick={() => navigateToQuestion(index)}>
            {`Q: ${index + 1}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionDropdown;
