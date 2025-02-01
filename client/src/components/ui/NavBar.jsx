import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default function NavBar({ user, logoutHandler }) {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container >
        <Navbar.Brand>
          <img
            src="/public/image.webp" 
            alt="Логотип"
            style={{ width: '80px', height: '80px', borderRadius: '50%' }} 
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavLink to="/" className="nav-link"
          >
            Главная страница
          </NavLink>
          {user.data && (
            <>
              <NavLink to={'/favorites'} className="nav-link">
                Избранное
              </NavLink>
              <NavLink to={'/newApartment'} className="nav-link">
                Добавить апартаменты
              </NavLink>
            </>
          )}
        </Nav>

        <Nav>
          {!user.data && (
            <>
              <NavLink to="/auth/signin" className="nav-link">
                Sign in
              </NavLink>
              <NavLink to={'/auth/signup'} className="nav-link">
                Sign Up
              </NavLink>
              <span className="nav-link">|</span>
            </>
          )}
          <span className="nav-link">
            Добро пожаловать, {user.data ? user.data.name : 'Гость'}!{' '}
          </span>
          {user.data && (
            <span className="nav-link">
              <Button onClick={logoutHandler} variant="outline-danger" size="sm">
                Logout
              </Button>
            </span>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
