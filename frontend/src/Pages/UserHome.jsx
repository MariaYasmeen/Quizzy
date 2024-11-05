import React from "react";
import { useNavigate } from "react-router-dom"; 
import QuizResults from "./QuizResults";
import { Container, Row, Col, Card } from "react-bootstrap"; 

const UserHome = () => {
  const navigate = useNavigate();  

   const navigateToPage1 = () => navigate("/quizresults");
  const navigateToPage2 = () => navigate("/home");
  const navigateToPage3 = () => navigate("/home");

  return (
    <Container className="mt-5">
      <h2 className="text-center">User Home</h2>
      
      <Row className="mt-4">
        <Col md={4}>
          <Card className="text-center" onClick={navigateToPage1} style={{ cursor: 'pointer' }}>
            <Card.Body>
              <h5>Result Portal</h5>
              <p>View results of all Quizzes taken</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center" onClick={navigateToPage2} style={{ cursor: 'pointer' }}>
            <Card.Body>
              <h5>Page 2</h5>
              <p>Click here to go to Page 2</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center" onClick={navigateToPage3} style={{ cursor: 'pointer' }}>
            <Card.Body>
              <h5>Page 3</h5>
              <p>Click here to go to Page 3</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
     </Container>
  );
}

export default UserHome;
