import React, { useState, useEffect } from 'react';
import { Form, Card, Col, Row } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance';

const Sidebar = ({ filters, onFiltersChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosInstance('/categories').then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handlePriceChange = (event) => {
    const { name, value } = event.target;

    onFiltersChange({
      ...filters,
      [name]: value,
    });
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    const categoryId = parseInt(value, 10);

    const updatedCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((category) => category !== categoryId);

    onFiltersChange({
      ...filters,
      categories: updatedCategories,
    });
  };

  return (
   
    <Col lg={8}>
   
      <Card>
        <Card.Body>
          <h5>Фильтры</h5>
          <Form >
            <Form.Group controlId="minPrice">
              <Form.Label>Минимальная цена</Form.Label>
              <Form.Control
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handlePriceChange}
              />
            </Form.Group>
            <Form.Group controlId="maxPrice">
              <Form.Label>Максимальная цена</Form.Label>
              <Form.Control
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handlePriceChange}
              />
            </Form.Group>

            <h6>Категории</h6>
            {categories.map((category) => (
              <Form.Check
                key={category.id}
                type="checkbox"
                label={category.category}
                value={category.id}
                checked={filters.categories.includes(category.id)}
                onChange={handleCategoryChange}
              />
            ))}
          </Form>
        </Card.Body>
      </Card>
      
    </Col>
    
  );
};

export default Sidebar;