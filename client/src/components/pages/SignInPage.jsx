import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function SignInPage({ signInHandler }) {
  return (
    
    <Row>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundImage: 'url(https://lavrushinskiy.ru/upload/iblock/815/8rdfpt6qr00xrhtm079vr617icl6k6s9.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          filter: 'blur(7px)'
        }}
      ></div>
      <Col  md={{ span: 3, offset: 5 }} className="mt-5">
      <div style={{padding: '100px', borderRadius: '8px'}}></div>
        <h2 className="text-center" >Sign In</h2>
        <Form onSubmit={signInHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Enter password" />
          </Form.Group>
          <Button variant="secondary" type="submit">
            Sign in
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
