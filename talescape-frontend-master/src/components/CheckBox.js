// src/components/HomePage.js
import React, { useState } from 'react';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import SearchBar from './SearchBar';
import ActionButtons from './ActionButtons';
import BookList from './BookList';
import CheckBox from './CheckBox';
import '../App.css'; // Ensure you import your CSS file

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);

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
          <Navbar.Brand href="/home">TaleScape</Navbar.Brand>
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
        <Col md={9} className="custom-book">
          <CheckBox selectedGenres={selectedGenres} onGenreSelect={handleGenreSelect} />
          <BookList searchTerm={searchTerm} selectedGenres={selectedGenres} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
