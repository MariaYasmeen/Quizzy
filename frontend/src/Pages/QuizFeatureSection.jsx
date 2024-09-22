import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Pages.css'; // Optional for custom styling

const QuizFeatureSection = () => {
  const features = [
    {
      title: "Teacher creates a quiz",
      description: "Create a group, add your students, assign exercises, and then share group link (or student codes) with your target students quickly.",
      imgSrc: "https://via.placeholder.com/100",
      altText: "Teacher creates a quiz"
    },
    {
      title: "Students do Test Online",
      description: "After joining group by 1-click login link or entering student code, students will see their tasks. They can then complete them online on their own devices!",
      imgSrc: "https://via.placeholder.com/100",
      altText: "Students do Test Online"
    },
    {
      title: "Teachers Easily Track Results",
      description: "Interactive Tasks will be automatically scored. Teachers now can track and follow students’ progress right on their phones or desktops.",
      imgSrc: "https://via.placeholder.com/100",
      altText: "Teachers Easily Track Results"
    },
    {
      title: "Home Notifications",
      description: "Automated notifications for both students and teachers regarding quiz deadlines and results to enhance engagement from both sides.",
      imgSrc: "https://via.placeholder.com/100",
      altText: "Home Notifications"
    }
  ];

  return (
    <section className="text-center py-5">
      <div className="container">
        <h2 className="mb-5 fw-bold">Online quizzing for any occasion</h2>
        <div className="row">
          {features.map((feature, index) => (
            <div className="col-lg-3 col-md-6 mb-4" key={index}>
              <div className="card border-0">
                <div className="card-body">
                  <img
                    src={feature.imgSrc}
                    alt={feature.altText}
                    className="rounded-circle mb-3 img-fluid"
                    width="100"
                    height="100"
                  />
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuizFeatureSection;
