import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBar from './ui/NavBar';
import Loader from './HOCs/Loader';
import { Col, Row } from 'react-bootstrap';
import Sidebar from './ui/Sidebar';
import Footer from './ui/Footer';

export default function Layout({ user, logoutHandler }) {
  return (
    <Loader showSpinner={user.status === 'fetching'}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar user={user} logoutHandler={logoutHandler} />
        <div style={{ flex: '1' }}>
          <Row>
            <Col md={12}>
              <Outlet /> {/* Здесь будет отображаться содержимое маршрутов */}
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    </Loader>
  );
}
