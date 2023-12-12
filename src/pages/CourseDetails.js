import React, { useContext, useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import UserContext from '../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const CourseDetails = () => {
  const [course, setCourse] = useState({});
  const { courseId } = useParams();

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const handleClick = async (e) => {
    if (user.id === null) {
      Swal.fire('Oops!', 'Login to enroll');
      navigate('/login');
    } else {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/courses/${courseId}/enroll`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        Swal.fire('Great!', 'You have successfully enrolled', 'success');
        navigate('/profile');
      } else if (response.status === 400) {
        Swal.fire('Oops', 'You are already enrolled in this course', 'error');
      } else {
        Swal.fire('Error', 'Something went wrong. Try again later', 'error');
      }
    }
  };

  useEffect(() => {
    const fetchCourse = async (courseId) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URI}/courses/${courseId}`
        );
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        } else {
          Swal.fire('Error', 'Resource Not Found', 'error');
          navigate('/courses');
        }
      } catch (error) {
        Swal.fire('Error', 'Resource Not Found', 'error');
        navigate('/courses');
      }
    };

    fetchCourse(courseId);
  }, []);

  return (
    <section className="course-details-container">
      <div className="course-content">
        <Card>
          <Card.Header as="h6">{course.language}</Card.Header>
          <Card.Body>
            <Card.Title>{course.name}</Card.Title>
            <Card.Text>{course.description}</Card.Text>
            <Card.Text>{course.about}</Card.Text>
            <Button className="mainBtn" variant="primary" onClick={handleClick}>
              Enroll Now
            </Button>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
};

export default CourseDetails;
