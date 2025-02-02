import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap';

const ActionButtons = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <ListGroup className="action-buttons-container mb-4 transparent-list-group">
      <ListGroup.Item>
        <Button variant="light" className="custom-button" onClick={() => handleNavigate('/saved')}>
          Saved
        </Button>
      </ListGroup.Item>
      <ListGroup.Item>
        <Button variant="light" className="custom-button" onClick={() => handleNavigate('/archive')}>
          Archive
        </Button>
      </ListGroup.Item>
      <ListGroup.Item>
        <Button variant="light" className="custom-button" onClick={() => handleNavigate('/continue-reading')}>
          Continue Reading
        </Button>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ActionButtons;
