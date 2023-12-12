import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

const NotFound = () => {
  return (
    <section className="not-found-section">
      <div className="text-center">
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <LinkContainer to="/">
          <Button>Go back</Button>
        </LinkContainer>
      </div>
    </section>
  );
};

export default NotFound;
