import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { getRandomColor } from "../services/quizUtils1";
const resources = [
  {
    title: "UN Sustainable Development Goals",
    url: "https://sdgs.un.org/goals"
  },
  {
    title: "SDG Knowledge Platform",
    url: "https://sustainabledevelopment.un.org/"
  },
  {
    title: "UNICEF – SDGs",
    url: "https://www.unicef.org/sdgs"
  },
  {
    title: "Global Goals Website",
    url: "https://globalgoals.org/"
  },
  {
    title: "World Bank - SDGs",
    url: "https://www.worldbank.org/en/topic/sustainabledevelopment"
  }
];

const ResourceLinks = () => {
  return (
    <div className="py-4">
      <h2 className="text-center mb-4">Explore SDG Resources</h2>

      <Row className="g-4"  >
        {resources.map((resource, index) => (
          <Col md={4} sm={6} xs={12} key={index} >
            <div className="shadow-sm rounded">
              <Card.Body style={{
          backgroundColor: getRandomColor(), 
        }} > 
                <Card.Title>{resource.title}</Card.Title>
                <Card.Text>Click to explore this resource on SDGs.</Card.Text>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <button className="btn btn-primary w-100">Go to Resource</button>
                </a>
              </Card.Body>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ResourceLinks;
