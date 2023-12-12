import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CourseCard from './CourseCard';
import Swal from 'sweetalert2';

const FeaturedCourses = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URI}/courses`
        );
        if (response.ok) {
          const courses = [];
          const data = await response.json();
          for (let i = 0; i < 4; i++) {
            courses.push(data[i]);
          }
          console.log(courses);
          setFeaturedCourses(courses);
        }
      } catch (error) {
        Swal.fire(
          'Failed',
          'Something went wrong. Visit again later.',
          'error'
        );
        console.error(error.message);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section className="featured d-flex flex-column justify-content-center align-items-center py-3">
      <h2 className="text-center">Featured Courses</h2>
      <p className="sub">Start learning</p>
      <Container className="featuredCourses-container">
        <Row className="">
          {featuredCourses.map((course) => (
            <Col key={course._id} md={6} lg={3} className="mb-3">
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
        <LinkContainer to="/courses">
          <Button className="mainBtn">View All Courses</Button>
        </LinkContainer>
      </Container>
    </section>
  );
};

export default FeaturedCourses;
