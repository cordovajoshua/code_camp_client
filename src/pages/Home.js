import React, { useContext } from 'react';
import Banner from '../components/Banner';
import FeaturedCourses from '../components/FeaturedCourses';
import UserContext from '../context/userContext';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { user } = useContext(UserContext);

  {
    return user.id === null ? (
      <>
        <Banner />
        <FeaturedCourses />
      </>
    ) : (
      <Navigate to="/profile" />
    );
  }
};

export default Home;
