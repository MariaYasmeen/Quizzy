import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hero.css'; // Optional for custom styling

const PlatformFeatures = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          {/* Left Text Section */}
          <div className="col-lg-6 mb-4">
            <h2 className="fw-bold">Simple, easy to use platform</h2>
            <p className="text-muted">
              An engaging, user-friendly platform for students to access and complete quizzes.
              We’ve created an interactive quiz experience that can easily be enjoyed by anyone.
            </p>
            <p className="text-muted">
              No matter how bad you are with technology.
            </p>
          </div>

          {/* Right Features Section */}
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="feature-card text-center p-4 rounded shadow-sm bg-light-yellow">
                  <img src="https://via.placeholder.com/50" alt="Customize templates" className="mb-3" />
                  <h5>Customize ready-made templates</h5>
                </div>
              </div>

              <div className="col-md-6">
                <div className="feature-card text-center p-4 rounded shadow-sm bg-light-blue">
                  <img src="https://via.placeholder.com/50" alt="Manage performance" className="mb-3" />
                  <h5>Manage and Track User’s performance</h5>
                </div>
              </div>

              <div className="col-md-6">
                <div className="feature-card text-center p-4 rounded shadow-sm bg-light-gray">
                  <img src="https://via.placeholder.com/50" alt="Create template" className="mb-3" />
                  <h5>Create a new Template</h5>
                </div>
              </div>

              <div className="col-md-6">
                <div className="feature-card text-center p-4 rounded shadow-sm bg-light-dark">
                  <img src="https://via.placeholder.com/50" alt="Browse quizzes" className="mb-3" />
                  <h5>Browse through exciting quizzes</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformFeatures;
