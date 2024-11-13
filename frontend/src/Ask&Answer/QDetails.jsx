import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestionDetails } from "../services/Q&AFETCH";
import { QAContext } from "../QAContext/QAContext";
import { timeAgo } from "../services/timeago";
import { calculateScore } from "../services/HandlerUtils";
import { Card, Container, Row, Col, Spinner, Button, Modal } from "react-bootstrap";
import CreateAnswer from "./CreateA";
import AnswerCard from "../Components/AnswerCard";

const QDetails = () => {
  const { questionId } = useParams();
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { qaData, votedAnswers, setVotedAnswers } = useContext(QAContext);
  const questionVotes = qaData.find((q) => q._id === questionId)?.votes || 0;

  useEffect(() => {
    fetchQuestionDetails(questionId, setQuestionData, setLoading, setError);
  }, [questionId]);

  const toggleAnswerForm = () => {
    setShowAnswerForm(!showAnswerForm);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!questionData) return <p>Question data is loading or not available.</p>;

  return (
    <Container className="py-5">
      <h6>Question:</h6>
      <h4>{questionData.questionText}</h4>
      <Card.Text className="text-muted mb-4">
        {questionData.answers.length} Answers | {questionVotes}{" "}
        {questionVotes === 1 ? "vote" : "votes"} |{" "}
        {timeAgo(questionData.createdAt)}
        <br />
        Asked by {questionData.askedBy.name}
      </Card.Text>

      <p style={{ fontSize: "14px" }}>
        {questionData.description || "No description available."}
      </p>
      {/* Image Gallery Section appears here */}
      {questionData.questionDocument?.length > 0 && (
        <>
        <p>Image Gallery:</p>
        <ImageGallery
          images={questionData.questionDocument}
          onImageClick={handleImageClick}
        />
        </>
      )}

      <Button variant="primary" onClick={toggleAnswerForm} className="mb-3">
        {showAnswerForm ? "Cancel" : "Answer this Question"}
      </Button>

      {showAnswerForm && <CreateAnswer questionId={questionId} />}

      <h5 className="mt-4">Solutions:</h5>
      {questionData.answers.length > 0 ? (
        <Row>
          {questionData.answers
            .slice()
            .reverse()
            .map((answer) => (
              <Col key={answer._id} md={12} className="mb-3">
                <AnswerCard
                  answer={answer}
                  questionId={questionId}
                  votedAnswers={votedAnswers}
                  setVotedAnswers={setVotedAnswers}
                  setQuestionData={setQuestionData}
                />
              </Col>
            ))}
        </Row>
      ) : (
        <p>No answers available for this question.</p>
      )}

      {/* Full-Screen Image Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Body className="p-0">
          {selectedImage && (
            <img
              src={`/Q&A/${selectedImage}`}
              alt="Full-size view"
              style={{
                width: "100vw",
                height: "100vh",
                objectFit: "contain",
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

 const LoadingState = () => (
  <Container className="text-center">
    <Spinner animation="border" />
    <p>Loading...</p>
  </Container>
);

const ErrorState = ({ error }) => (
  <Container>
    <h4>Error: {error}</h4>
  </Container>
);

 const ImageGallery = ({ images, onImageClick }) => {
  const displayedImages = images.slice(0, 4); 
  const remainingImages = images.length - displayedImages.length;

  return (
    <Row className="mb-4">
      {displayedImages.map((img, index) => (
        <Col
          key={index}
          xs={6}
          md={3}
          className="mb-2"
          onClick={() => onImageClick(img)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={`/Q&A/${img}`}
            alt={`Question image ${index + 1}`}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Col>
      ))}
      {remainingImages > 0 && (
        <Col
          xs={6}
          md={3}
          className="mb-2 d-flex align-items-center justify-content-center bg-light"
          onClick={() => onImageClick(images[3])}
          style={{
            cursor: "pointer",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          +{remainingImages}
        </Col>
      )}
    </Row>
  );
};

export default QDetails;
