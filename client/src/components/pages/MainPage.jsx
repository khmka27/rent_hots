import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axiosInstance from '../api/axiosInstance';
import ApartmentCard from '../ui/ApartmentCard';
import Sidebar from '../ui/Sidebar';

export default function ApartmentsPage({ user }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axiosInstance.get('/apartments').then((res) => setCards(res.data));
  }, []);

  return (
    <div>
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
        }}
      >
        <h1
          style={{
            color: 'white',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '8rem',
            fontWeight: 'bold',
            opacity: 0.7,
          }}
        >
          Real Hots
        </h1>
      </div>
      <Row className="mt-3">
        <Col md={4} lg={3}>
          {/* <Sidebar /> */}
        </Col>
        <Col md={8} lg={9}>
          <Row>
            {cards.map((card) => (
              <ApartmentCard
                key={card.id}
                card={card}
                user={user}
                newObjectSubmitHandler={newObjectSubmitHandler}
                setCards={setCards}
                deleteHandler={deleteHandler}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
