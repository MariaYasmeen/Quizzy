import React from "react";
 import "./Dashboard.css";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
 

const Dashboard = () =>{
    return (
        <>
         <div className="homelinks">
          <Link  className="homelinks" to="/createquiz"> Create Quiz</Link>
          <Link className="homelinks" to="/dashboard/allquizzes"> View all Quizzes</Link>
          </div>
         </>
    )
}

export default Dashboard;