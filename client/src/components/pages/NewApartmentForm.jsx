import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NewApartmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    address: '',
    desc: '',
    coordinates: '',
    ownerId: '',
    price: '',
    isReserve: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/apartments', {
        // Используем прокси
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Новая квартира добавлена:', result);
        setFormData({
          name: '',
          categoryId: '',
          address: '',
          desc: '',
          coordinates: '',
          ownerId: '',
          price: '',
          isReserve: false,
        });

        navigate('/');
      } else {
        throw new Error('Ошибка при добавлении квартиры');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Добавить новую позицию</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Название</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Введите название"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategoryId">
          <Form.Label>Категория ID</Form.Label>
          <Form.Control
            name="categoryId"
            type="number"
            placeholder="Введите ID категории"
            value={formData.categoryId}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Адрес</Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder="Введите адрес"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDesc">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            name="desc"
            as="textarea"
            rows={3}
            placeholder="Введите описание квартиры"
            value={formData.desc}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCoordinates">
          <Form.Label>Координаты</Form.Label>
          <Form.Control
            name="coordinates"
            type="text"
            placeholder="Введите координаты (например, '55.7558, 37.6173')"
            value={formData.coordinates}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formOwnerId">
          <Form.Label>ID владельца</Form.Label>
          <Form.Control
            name="ownerId"
            type="number"
            placeholder="Введите ID владельца"
            value={formData.ownerId}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Цена</Form.Label>
          <Form.Control
            name="price"
            type="number"
            placeholder="Введите"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Control
          name="file"
          type="file"
          placeholder="Загрузите изображение"
          className="mb-3"
        />

        <Form.Group className="mb-3" controlId="formIsReserve">
          <Form.Check
            name="isReserve"
            type="checkbox"
            label="Забронировано"
            checked={formData.isReserve}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="outline-primary" type="submit">
          Опубликовать
        </Button>
      </Form>
    </Container>
  );
};

export default NewApartmentForm;