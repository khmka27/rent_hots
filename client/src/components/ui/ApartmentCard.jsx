import React from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import { NavLink } from 'react-router-dom';

export default function ApartmentCard({ card, user, deleteHandler }) {
  const cardStyle = {
    backgroundImage: `url(${card.imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    height: '400px',
    width: '460px',
  };

  return (
    <Col md={4} className="mb-4">
      <Card className="w-100">
        <NavLink to={`/oneApartment/${card.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={cardStyle}>
            <Card.Body>
              
            </Card.Body>
          </div>
        </NavLink>
        <Card.Body style={{ backgroundColor: 'white', color: 'black' }}>
          <h4 className="p-2">{card.name}</h4>
          <p className="p-2">{card.address}</p>
          <p className="p-2">{card.desc}</p>
          <p className="p-2">от {card.price}$ в месяц</p>
        </Card.Body>
        {user?.data?.isAdmin && (
          <Button onClick={() => deleteHandler(card.id)} className="mt-2">
            Удалить
          </Button>
        )}
      </Card>
    </Col>
  );
}
