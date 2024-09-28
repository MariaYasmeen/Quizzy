import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hero.css'; 

import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import img4 from "../assets/img4.png"

const QuizFeatureSection = () => {
  const features = [
    {
      title: "Teacher creates a quiz",
      description: "Create a group, add your students, assign exercises, and then share group link (or student codes) with your target students quickly.",
      imgSrc: img1,
      altText: "Teacher creates a quiz"
    },
    {
      title: "Students do Test Online",
      description: "After joining group by 1-click login link or entering student code, students will see their tasks. They can then complete them online on their own devices!",
      imgSrc: img2,
      altText: "Students do Test Online"
    },
    {
      title: "Teachers Easily Track Results",
      description: "Interactive Tasks will be automatically scored. Teachers now can track and follow students’ progress right on their phones or desktops.",
      imgSrc: img3,
      altText: "Teachers Easily Track Results"
    },
    {
      title: "Home Notifications",
      description: "Automated notifications for both students and teachers regarding quiz deadlines and results to enhance engagement from both sides.",
      imgSrc: img4,
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
