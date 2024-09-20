import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import Navbar from '../Components/Navbar';
import heroimage from "../assets/herimg.png"

const Hero = () => {
  return (
    <>
    <Navbar />
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-md-start text-center">
            <h2 className="mb-4">Ready to teach and learn with ease?</h2>
            <p className="mb-4">
              Test your knowledge, track progress while unlocking your learning potential with every quiz!
            </p>
            <button className="btn btn-dark">Explore Quizzes</button>
          </div>
          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img src={heroimage} alt="Hero Illustration" style={{width:"500px"}} className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;
