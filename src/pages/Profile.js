import React, { useContext, useEffect, useState } from 'react';
import { Row, Card, Col, Container, Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import MyCourseCard from '../components/MyCourseCard';
import Swal from 'sweetalert2';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [originalUserDetails, setOriginalUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [courses, setCourses] = useState([]);
  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleCancelClick = () => {
    // Reset back to the original values
    setUserDetails(originalUserDetails);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    // Save the original values before editing
    setOriginalUserDetails(userDetails);
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    try {
      console.log('clicked');
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/users/profile`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        }
      );
      console.log(response);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        Swal.fire('Success', 'Profile info updated successfully!', 'success');
        setUserDetails(userDetails);
        setIsEditing(!isEditing);
      } else if (data.message === 'Email already registered') {
        Swal.fire('Failed!', data.message, 'error');
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      Swal.fire('Error', 'Something went wrong. Try again later', 'error');
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_URI}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
          setOriginalUserDetails(data);
          setCourses(data.courses);
        } else {
          setUserDetails({});
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetails();
  }, []);

  return user.id !== null ? (
    <section className="profile mt-4">
      <Container>
        <Row className="g-3">
          <Col md={{ order: 2 }}>
            <h4>My Profile</h4>
            <Card className="p-4">
              <Form className="profile-form">
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    required
                    value={userDetails.firstName}
                    disabled={!isEditing}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={userDetails.lastName}
                    required
                    disabled={!isEditing}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    required
                    value={userDetails.email}
                    disabled={!isEditing}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="d-flex gap-2">
                  <Button
                    type="button"
                    variant="info"
                    onClick={handleEditClick}
                    style={{ display: isEditing ? 'none' : 'inline-block' }}
                  >
                    Edit
                  </Button>
                  {isEditing ? (
                    <>
                      <Button
                        variant="success"
                        type="button"
                        onClick={handleSaveClick}
                      >
                        Save
                      </Button>
                      <Button
                        type="button"
                        variant="danger"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : null}
                </div>
              </Form>
            </Card>
          </Col>
          <Col lg={8} md={{ order: 1 }}>
            <h4>My Courses</h4>
            {courses.length === 0 ? (
              <h2>No enrolled courses.</h2>
            ) : (
              courses.map(({ courseId }) => (
                <MyCourseCard key={courseId._id} course={courseId} />
              ))
            )}
          </Col>
        </Row>
      </Container>
    </section>
  ) : (
    <Navigate to="/" />
  );
};

export default Profile;
