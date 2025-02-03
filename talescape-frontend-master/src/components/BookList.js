import React, { useState } from 'react';
import { Card, Col, Row, Modal, Button, Alert } from 'react-bootstrap';
import hippo from '../Assets/hippo.jpg';
import dino from '../Assets/dino.jpg';
import frog from '../Assets/frog.jpg';
import squirrel from '../Assets/squirrel.jpg';

const books = [
  { id: 1, title: 'When do Hippos Play', author: 'John Vincent Andaya', imageUrl: hippo},
  { id: 2, title: 'Adventures of Dino', author: 'Catherine Batalon', imageUrl: dino },
  { id: 3, title: 'I Found a Frog', author: 'Daniel Matthew Benegas', imageUrl: frog },
  { id: 4, title: 'The Brave Little Squirrel', author: 'Steven Devoma', imageUrl: squirrel },
];

const BookList = () => {
  const [showBookModal, setShowBookModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [action, setAction] = useState(''); 
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
  const [successMessage, setSuccessMessage] = useState(''); 


  // Opens book details modal
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowBookModal(true);
  };

  // Opens confirmation modal
  const handleActionClick = (action) => {
    setAction(action);
    console.log('Action:', action);
    setConfirmMessage(`Are you sure you want to ${action.toLowerCase()} "${selectedBook?.title}"?`);
    setShowConfirmModal(true);
  };
  
  const handleConfirmAction = () => {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    const archivedBooks = JSON.parse(localStorage.getItem('archivedBooks')) || [];
  
    if (action === 'Save') {
      const isBookAlreadyArchived = archivedBooks.some(book => book.id === selectedBook.id);
      if (!isBookAlreadyArchived) {
        const isBookAlreadySaved = savedBooks.some(book => book.id === selectedBook.id);
        if (!isBookAlreadySaved) {
          localStorage.setItem('savedBooks', JSON.stringify([...savedBooks, selectedBook]));
          setSuccessMessage(`Book "${selectedBook.title}" has been saved successfully.`);
          setShowSuccessModal(true);
        }
      }
    } else if (action === 'Archive') {
      const isBookAlreadySaved = savedBooks.some(book => book.id === selectedBook.id);
      if (!isBookAlreadySaved) {
        const isBookAlreadyArchived = archivedBooks.some(book => book.id === selectedBook.id);
        if (!isBookAlreadyArchived) {
          localStorage.setItem('archivedBooks', JSON.stringify([...archivedBooks, selectedBook]));
          setSuccessMessage(`Book "${selectedBook.title}" has been archived successfully.`);
          setShowSuccessModal(true);
        }
      }
    }
    setShowConfirmModal(false);
    setShowBookModal(false);
  };

  return (
    <>
      <Row>
        {books.map((book) => (
          <Col md={3} key={book.id} className="mb-4">
            <Card onClick={() => handleBookClick(book)} style={{cursor: 'pointer' }}>
              <Card.Img variant="top" src={book.imageUrl} alt={book.title} style={{ height: '300px', objectFit: 'fluid' }} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Book Info Modal */}
      <Modal show={showBookModal} onHide={() => setShowBookModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBook?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={selectedBook?.imageUrl} alt={selectedBook?.title} style={{ width: '100%', height: '500px', objectFit: 'fluid' }} />
          <p className="mt-3"><strong>Author:</strong> {selectedBook?.author}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleActionClick('Start Reading')}>Start Reading</Button>
          <Button variant="success" onClick={() => handleActionClick('Save')}>Save</Button>
          <Button variant="warning" onClick={() => handleActionClick('Archive')}>Archive</Button>
          <Button variant="primary" onClick={() => handleActionClick('Continue Reading')}>Continue Reading</Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal (Positioned at the Top) */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} style={{ top: '10%' }}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>{confirmMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmAction}>Confirm</Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookList;
