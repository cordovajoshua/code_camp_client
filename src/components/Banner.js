import React from 'react';
import { Col, Row } from 'react-bootstrap';
import SignUpForm from './SignUpForm';
import bannerImg from '../assets/programming.svg';

const Banner = () => {
  return (
    <section className="banner">
      <Row>
        <Col lg={6} className="banner-image-container">
          <img src={bannerImg} className="banner-img" />
        </Col>
        <Col lg={6}>
          <h2 className="text-center">Build your tech career.</h2>
          <SignUpForm />
        </Col>
      </Row>
    </section>
  );
};

export default Banner;
