import React, { useState } from "react";
import { Container, Row, Col, Modal, Spinner, Button, Card } from "react-bootstrap";
import AnimatedButton from "../StyleComponents/AnimBtn";
import ResourceLinks from "../Components/ResourceLinks";

const videoLinks = [
  { 
    title: "Introduction to SDGs", 
    url: "https://www.youtube.com/embed/OolK0ISD3eA", 
    thumbnail: "https://img.youtube.com/vi/OolK0ISD3eA/0.jpg"
  },
  { 
    title: "Importance of SDGs", 
    url: "https://www.youtube.com/embed/qAIolKgDPrA",  
    thumbnail: "https://img.youtube.com/vi/qAIolKgDPrA/0.jpg"
  },
  { 
    title: "World's Largest Lesson", 
    url: "https://www.youtube.com/embed/cBxN9E5f7pc",  
    thumbnail: "https://img.youtube.com/vi/cBxN9E5f7pc/0.jpg"
  },
  { 
    title: "What Are SDGs?", 
    url: "https://www.youtube.com/embed/9-xdy1Jr2eg", 
    thumbnail: "https://img.youtube.com/vi/9-xdy1Jr2eg/0.jpg"
  },

];

const StudyResources = () => {
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");  
  const handleShow = (url, title) => {
    setVideoUrl(url);
    setVideoTitle(title); 
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="py-2">
      <ResourceLinks />
      <h2 className="text-center mb-5">Explore SDG Videos</h2>

       <Row className="g-2">
        {videoLinks.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center w-100">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          videoLinks.map((video, index) => (
            <Col style={{width:"48%"}} md={6} sm={12} key={index} className="mb-5">
              <div style={{height:"auto", boxShadow:" 1px 1px 10px grey"}} className=" d-flex p-1 flex-column">
                <div className="d-flex flex-column">
                   {video.thumbnail && (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="img-fluid mb-3"
                      style={{
                        objectFit: "cover",
                        height: "220px",  
                        width: "100%",
                        borderRadius: "8px", 
                      }}
                    />
                  )}
                   <h5 className="text-center ">{video.title}</h5>
                    <AnimatedButton
                      text="Watch Now"
                      onClick={() => handleShow(video.url, video.title)}  
                      color="black"
                      borderColor="grey"
                      shadowColor="grey"
                    />
                </div>
              </div>
            </Col>
          ))
        )}
      </Row>

       <Modal
        show={showModal}
        onHide={handleClose}
        centered
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <h3 id="contained-modal-title-vcenter">{videoTitle}</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              width="100%"
              height="400"
              src={videoUrl}
              title="YouTube video"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudyResources;
