import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Hero.css'; 

const CreateQuizSection = () => {
  return (
    <>
    <section className="create-quiz-section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Image Section */}
          <div className="col-md-6">
            <img
              src="https://via.placeholder.com/500"
              alt="Quiz Builder"
              className="img-fluid rounded"
            />
          </div>

          {/* Right Text Section */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Create quizzes, fast</h2>
            <p className="text-muted">
              Using the online quiz builder, you can write quiz questions and set correct answers.
            </p>
            <p className="text-muted">
              Featuring a simple, intuitive design, so you can create the perfect online quiz in minutes.
            </p>
            <a href="#" className="btn btn-outline-dark mt-4">
              Start Creating A Quiz <i className="bi bi-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
    <div className="container">
      <div className="header">
        <h2>Create your free account and get started with Quizzy today</h2>
        <button className="cta-button">
          GET STARTED FOR FREE <span className="arrow">→</span>
        </button>
      </div>
      
      <div className="features-box">
        <ul className="features-list">
          <li>✓ Real-time scoring and leaderboards</li>
          <li>✓ Simple, easy-to-use platform</li>
          <li>✓ Create, edit, and track quizzes in one place</li>
          <li>✓ Get real-time results after each quiz!</li>
          <li>✓ Instant Feedback and Progress Tracking</li>
          <li>✓ Smart Notifications to stay updated on quiz deadlines and results!</li>
        </ul>
      </div>
    </div>
  </>
    
  );
};

export default CreateQuizSection;
