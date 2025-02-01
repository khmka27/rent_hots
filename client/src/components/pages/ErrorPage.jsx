import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

function ErrorPage() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <Container className="text-center mt-5">
      <h1>404</h1>
      <img
        src="/photo_2024-11-15_14-46-44.jpg" 
        alt="Страница не найдена"
        style={{ width: '100%', maxWidth: '400px', marginBottom: '20px' }}
      />
      <p>Сайт уснул</p>
      <Button variant="primary" onClick={goToHome}>
        Разбудить
      </Button>
    </Container>
  );
}

export default ErrorPage;