const { Photo } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const express = require('express');

const photoRouter = express.Router();

photoRouter
  .route('/')
  .get(verifyAccessToken, async (req, res) => {
    const { apartmentId } = req.query;
    try {
      const photos = await Photo.findAll({
        where: { apartmentId: apartmentId }
      });

      res.json(photos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      await Photo.create(req.body);

      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });

photoRouter
  .route('/:id')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const { id } = req.params;

      if (Number.isNaN(+id)) {
        return res.status(400).json({ message: 'Id must be a number' });
      }

      const photo = await User.findByPk(id);
      if (!photo) {
        return res.status(404).json({ message: 'photo not found' });
      }

      res.json(photo);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  })
  .delete(verifyAccessToken, async (req, res) => {
    try {
      const { id } = req.params;
      if (Number.isNaN(+id)) {
        return res.status(400).json({ message: 'Id must be a number' });
      }
      const delPhoto = await Photo.findByPk(req.params.id);
      // if (!delPhoto) {
      //   return res.status(404).json({ message: 'not found' });
      // }
      // if (delPhoto.userId !== res.locals.user.id) {
      //   return res.status(401).json({ message: 'Unable to complete' });
      // }
      await delPhoto.destroy();
      res.json({ message: 'delPhoto deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = photoRouter;
