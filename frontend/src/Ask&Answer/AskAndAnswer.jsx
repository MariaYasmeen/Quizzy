import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import AllQA from './AllQs'; 
import { Link } from 'react-router-dom'; 


const Questions = () => {
    return (
        <> 
         <main className="flex-grow-1 overflow-auto"  >

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
