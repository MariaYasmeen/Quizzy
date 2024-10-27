// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "./Components.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column sidebarcss flex-shrink-0 p-1 bg-body-tertiary" style={{ width: '180px', position:"fixed" }}>
     
       <ul className="nav nav-pills flex-column mb-auto navlist">
        <li className="nav-item">
          <Link to="#" className="nav-link  link-body-emphasis " aria-current="page">
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#home" />
            </svg>
            Home
          </Link>
        </li>
        <li>
          <Link to="/questions" className="nav-link link-body-emphasis">
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#speedometer2" />
            </svg>
            Questions
          </Link>
        </li>
        <li>
          <Link to="/createquiz" className="nav-link link-body-emphasis">
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#table" />
            </svg>
            Create Quiz
          </Link>
        </li>
        <li>
          <Link to="/dashboard/allquizzes" className="nav-link link-body-emphasis">
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#grid" />
            </svg>
            Take Quiz
          </Link>
        </li>
        <li>
          <Link to="#" className="nav-link link-body-emphasis">
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#people-circle" />
            </svg>
            Templates
          </Link>
        </li>
        <li>
          <Link to="#" className="nav-link link-body-emphasis">
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#people-circle" />
            </svg>
            Achievements
          </Link>
        </li>
        <li>
          <Link to="#" className="nav-link link-body-emphasis">
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#people-circle" />
            </svg>
            Settings
          </Link>
        </li>
      </ul>
      <hr />
    <p>USer's acheivements or badges will appear here on upon earning certain points</p>
    </div>
  );
};

export default Sidebar;
