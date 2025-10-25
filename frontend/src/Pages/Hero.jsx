// Hero.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
 import { Link } from 'react-router-dom';
import heroimage from "../assets/herimg.png";
import "./Pages.css";
import QuizFeatureSection from '../Hero/QuizFeatureSection';
import PlatformFeatures from '../Hero/PlatformFeatures';
import CreateQuizSection from '../Hero/CreateQuizSection';
 
const Hero = () => {
  return (
    <>
       <div >
         <main className="flex-grow-1 overflow-auto" >
        <section className="herosection">
            <div className="lightbgctr textsection">
              <div className="row align-items-center">
                <div className="col-md-6 text-md-start">
                  <h2 className="heroh2">Learn, Quiz, Explore!

</h2>
                  {/* <h2 className="heroh2">and learn with ease?</h2> */}
                  <p className="mb-4">
                  A platform to ask questions, take quizzes, and access study resources—all in one place.

</p>
                  <Link to="/createquiz" style={{ backgroundColor: "#383737", color: "whitesmoke" }} className="btn">
                    Start creating Quiz
                  </Link>
                  <Link to="/publicquizzes" className="btn">Explore Quizzes</Link>
                </div>
                <div className="col-md-6 text-center mt-md-5">
                  <img src={heroimage} alt="Hero Illustration" style={{ width: "500px" }} className="img-fluid" />
                </div>
              </div>
            </div>
          </section>
          <QuizFeatureSection />
          <PlatformFeatures />
          <CreateQuizSection />
        </main>
      </div>
    </>
  );
};

export default Hero;
