import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const Footer = () => {
  return (
    <footer className="bg-light text-center py-3">
      <Container>
        <Nav className="justify-content-center">
          <Nav.Link href="https://yandex.ru/maps/org/elbrus_butkemp/101761078308/?ll=37.596959%2C55.706530&z=14" className="nav-link">
            Наш адрес: 
            Орджоникидзе ул., 11с10, Москва
          </Nav.Link>
          <Nav.Link href="mailto:boobooking@example.com" className="nav-link">
            Email: RealHots@elite.com
          </Nav.Link>
        </Nav>
        <p className="mt-2">© {new Date().getFullYear()} Real Hots</p>
      </Container>
    </footer>
  );
};

export default Footer;
