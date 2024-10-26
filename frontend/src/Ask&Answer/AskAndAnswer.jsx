import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import AllQA from './AllQs';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';


const Questions = () => {
    return (
        <>
         <Navbar />
        <Container>
            <h1>All Questions</h1>
            <h5>4 questions</h5>
            <Link variant="primary" to="/createquestion" className="mb-2">Ask  Question</Link>
            <Link variant="primary" to="/myquestions" className="mb-2">My  Questions</Link>
            <AllQA/>
           
        </Container>
        </>

    );
};

export default Questions;
