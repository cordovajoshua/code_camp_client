import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import UserContext from '../context/userContext';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="sticky-top z-3">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Code Camp</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/courses">
              <Nav.Link>Courses</Nav.Link>
            </LinkContainer>

            {user.id !== null ? (
              <>
                <LinkContainer to="/profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/logout">
                  <Nav.Link>Logout</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
