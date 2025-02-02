// src/components/HomePage.js
import React, { useState } from 'react';
import { Container, Navbar, Nav, Row, Col, Form } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import ActionButtons from '../components/ActionButtons';
//import BookList from '../components/BookList';
import '../App.css'; // Ensure you import your CSS file

const ContinueReading = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genres = ['Adventure', 'Horror', 'Fantasy', 'Mystery', 'Romance'];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenres((prev) => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
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
        </Col>
      </Row>
    </Container>
  );
};

export default ContinueReading;
