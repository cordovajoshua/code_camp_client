import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import { UserProvider } from './context/userContext';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Swal from 'sweetalert2';
import NotFound from './pages/NotFound';

const App = () => {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setUser({
            id: null,
            isAdmin: null,
          });
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
          if (data._id !== undefined) {
            setUser({
              id: data._id,
              isAdmin: data.isAdmin,
            });
          } else {
            setUser({
              id: null,
              isAdmin: null,
            });
            console.error(
              'Failed to fetch data:',
              response.status,
              response.statusText
            );
          }
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

    fetchUserDetails();
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;
