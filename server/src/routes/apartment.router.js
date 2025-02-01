const { Apartment } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const express = require('express');

const apartmentRouter = express.Router();

apartmentRouter
  .route('/')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const apartments = await Apartment.findAll();

      res.json(apartments);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  })
  .post(async (req, res) => {
    try {
      const apartment = await Apartment.create(req.body);
      res.status(201).json(apartment);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });

apartmentRouter
  .route('/:id')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const { id } = req.params;

      if (Number.isNaN(+id)) {
        return res.status(400).json({ message: 'Id must be a number' });
      }

      const apartment = await Apartment.findByPk(id);
      if (!apartment) {
        return res.status(404).json({ message: 'apartment not found' });
      }

      res.json(apartment);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  })
  .put(async (req, res) => {
    const updatableFields = [
      'name',
      'categoryId',
      'address',
      'desc',
      'coordinates',
      'ownerId',
      'price',
      'mapLink',
    ];
    try {
      const { id } = req.params;

      const putApartment = await Apartment.findByPk(id);
      if (!putApartment) {
        return res.status(404).json({ message: 'not found' });
      }

      const updates = Object.keys(req.body)
        .filter((key) => updatableFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = req.body[key];
          return obj;
        }, {});

      await Apartment.update(updates, { where: { id } });
      return res.status(200).json(updates);
    } catch (error) {
      return res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  })

  .delete(verifyAccessToken, async (req, res) => {
    try {
      const { id } = req.params;
      if (Number.isNaN(+id)) {
        return res.status(400).json({ message: 'Id must be a number' });
      }
      const delApartment = await Apartment.findByPk(req.params.id);
      // if (!delApartment) {
      //   return res.status(404).json({ message: 'not found' });
      // }
      // if (delApartment.userId !== res.locals.user.id) {
      //   return res.status(401).json({ message: 'Unable to complete' });
      // }
      await delObject.destroy();
      res.json({ message: 'delApartment deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = apartmentRouter;
