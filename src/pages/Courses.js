import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import { DUMMY_COURSES } from '../data';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URI}/courses`
        );
        const data = await response.json();
        console.log(data);
        setCourses(data);
      } catch (error) {
        Swal.fire(
          'Error',
          'There is an error while fetching courses. Try again later.',
          'error'
        );
        console.log(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="courses-section mt-4">
      <Container>
        <h3>Code Camp Courses</h3>

        <div className="courses-container">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Courses;
