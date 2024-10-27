import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import AllQA from './AllQs';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';


const Questions = () => {
    return (
        <>
         <Navbar />
         <Sidebar />
         <main className="flex-grow-1 overflow-auto" style={{ marginLeft: '200px', padding: '20px' }}>

        <div>
            <h3>All Questions</h3>
            <p>4 questions</p>
            <Link variant="primary" to="/createquestion" className="mb-2  ">Ask  Question</Link>
             <AllQA/>
           
        </div>
        </main>
        </>

    );
};

export default Questions;
