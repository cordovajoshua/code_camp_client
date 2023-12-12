import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  let shortenedDescription =
    course.description.length > 100
      ? course.description.substring(0, 100) + '...'
      : course.description;

  return (
    <Card className="text-left course-card">
      <Card.Header>Free</Card.Header>
      <Card.Body>
        <Card.Title>
          <Link to={`/courses/${course._id}`} className="stretched-link">
            {course.name}
          </Link>
        </Card.Title>
        <Card.Text>{shortenedDescription}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {course.noOfEnrollees} enrollees
      </Card.Footer>
    </Card>
  );
};

export default CourseCard;
