import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../context/userContext';

const SignIn = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchUserDetails = async (token) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data);
        const user = fetchUserDetails(data);
        setUser({
          id: user._id,
          isAdmin: user.isAdmin,
        });
        navigate('/profile');
      } else if (response.status === 400) {
        Swal.fire('Failed', 'Sorry, we could not find you account.', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Something went wrong. Try again later', 'error');
    }
  };

  return (
    <div className="login form-container">
      <Form className="login-form" onSubmit={handleSubmit}>
        <h2 className="mb-3">Login to Code Camp</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email Address"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            required
          />
        </Form.Group>
        <Button className="mainBtn" type="submit">
          Log In
        </Button>

        <small className="mt-3 d-inline-block">
          Dont have an account? <Link to="/">Sign Up</Link>
        </small>
      </Form>
    </div>
  );
};

export default SignIn;
