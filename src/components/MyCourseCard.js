import React from 'react';
import { Card } from 'react-bootstrap';

const MyCoursesCard = ({ course: { description, language, name } }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{language}</Card.Subtitle>
        <Card.Title>{name}</Card.Title>

        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyCoursesCard;
