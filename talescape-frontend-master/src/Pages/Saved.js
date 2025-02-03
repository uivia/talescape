import React, { useState, useEffect } from 'react';
import { Card, Container, Navbar, Nav, Row, Col, Form, Modal, Button } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import ActionButtons from '../components/ActionButtons';
import '../App.css';

const Saved = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedBooks, setSavedBooks] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false); // Define showModal state

  const genres = ['Adventure', 'Horror', 'Fantasy', 'Mystery', 'Romance'];

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    setSavedBooks(savedBooks);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenres((prev) => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleRemoveBook = (bookId) => {
    const updatedBooks = savedBooks.filter(book => book.id !== bookId);
    setSavedBooks(updatedBooks);
    localStorage.setItem('savedBooks', JSON.stringify(updatedBooks));
  };

  return (
    <Container fluid>
      <Navbar className="navbar-custom mb-4" expand="lg">
        <Container>
          <Navbar.Brand href="/">TaleScape</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Item className="me-2">
              <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Row>
        <Col md={3} className="d-flex flex-column align-items-start">
          <ActionButtons />
        </Col>
        <Col md={10} className="custom-book">
          <Form className="mb-4"> {/* Form for genre checkboxes */}
            <Form.Group>
              <div className="custom-box d-flex flex-wrap"> {/* Flex container for horizontal layout */}
                {genres.map((genre) => (
                  <Form.Check
                    key={genre}
                    type="checkbox"
                    id={genre}
                    label={genre}
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreSelect(genre)}
                    className="me-3" // Add margin to the right for spacing
                  />
                ))}
              </div>
            </Form.Group>
          </Form>
          <Col md={9}>
            <Row>
              {savedBooks.map((book) => (
                <Col md={3} key={book.id} className="mb-4">
                <Card onClick={() => handleBookClick(book)} style={{cursor: 'pointer' }}>
                  <Card.Img variant="top" src={book.imageUrl} alt={book.title} style={{ height: '300px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
              ))}
            </Row>
            {selectedBook && (
              <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>{selectedBook.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                  <img src={selectedBook.imageUrl} alt={selectedBook.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                  <p className="mt-3"><strong>Author:</strong> {selectedBook.author}</p>
                </Modal.Body>
                <Modal.Footer>
                  {/* Added a remove button for debugging purposes */}
                  {/* Uncomment the remove button if needed */}
                  <Button variant="danger" onClick={() => handleRemoveBook(selectedBook.id)}>Remove</Button>
                  <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
              </Modal>
            )}
          </Col>
        </Col>
        
      </Row>
    </Container>
  );
};

export default Saved;