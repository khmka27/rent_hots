import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axiosInstance from '../api/axiosInstance';
import ApartmentCard from '../ui/ApartmentCard';
import Sidebar from '../ui/Sidebar';

export default function ApartmentsPage({ user }) {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    categories: [],
  });

  useEffect(() => {
    axiosInstance.get('/apartments').then((res) => {
      setCards(res.data);
      setFilteredCards(res.data);
    });
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);

    const filtered = cards.filter((card) => {
      const price = +card.price;

      const makePrice =
        (!newFilters.minPrice || price >= +newFilters.minPrice) &&
        (!newFilters.maxPrice || price <= +newFilters.maxPrice);

      const makeCategories =
        newFilters.categories.length === 0 || newFilters.categories.includes(card.categoryId);

      return makePrice && makeCategories;
    });

    setFilteredCards(filtered);
  };

  const deleteHandler = (id) => {
    axiosInstance.delete(`/apartments/${id}`).then(() => {
      setCards((prev) => prev.filter((el) => el.id !== id));
      setFilteredCards((prev) => prev.filter((el) => el.id !== id));
    });
  };

  return (
    <Row className="mt-3">
      <Col md={4} lg={2}>
        <Sidebar filters={filters} onFiltersChange={handleFiltersChange} />
      </Col>
      <Col md={8} lg={9}>
        <Row>
          {filteredCards.map((card) => (
            <ApartmentCard key={card.id} card={card} user={user} deleteHandler={deleteHandler} />
          ))}
        </Row>
      </Col>
    </Row>
  );
}