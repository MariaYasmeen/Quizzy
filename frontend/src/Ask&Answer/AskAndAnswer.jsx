import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import AllQA from './AllQA';
import Navbar from '../Components/Navbar';


const Questions = () => {
    return (
        <>
         <Navbar />
        <Container>
            <h1>All Questions</h1>
            <h5>4 questions</h5>
            <button variant="primary" className="mb-2">Ask  Question</button>
            <AllQA/>
           
        </Container>
        </>

    );
};

export default Questions;
