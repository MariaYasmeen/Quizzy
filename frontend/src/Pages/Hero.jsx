import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import Navbar from '../Components/Navbar';
import heroimage from "../assets/herimg.png"
import "./Pages.css"
import QuizFeatureSection from './QuizFeatureSection';
import PlatformFeatures from './PlatformFeatures';

const Hero = () => {
  return (
    <>
    <Navbar />
    <section className="  herosection ">
      <div className="  lightbgctr textsection">
        <div className="row align-items-center ">
          <div className="col-md-6 text-md-start  ">
            <h2 className=" heroh2 ">Ready to teach </h2>
            <h2 className=" heroh2">and learn with ease?</h2>
            <p className="mb-4">
              Test your knowledge, track progress while unlocking your learning potential with every quiz!
            </p>
            <button className="btn btn-dark">Explore Quizzes</button>
          </div>
          <div className="col-md-6 text-center mt-md-5">
            <img src={heroimage} alt="Hero Illustration" style={{width:"500px"}} className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
    <QuizFeatureSection />
    <PlatformFeatures/>
    </>
  );
};

export default Hero;
