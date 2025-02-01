const { Favorite } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const express = require('express');

const favoriteRouter = express.Router();

favoriteRouter
  // .route('/')
  // .get(verifyAccessToken, async (req, res) => {
  //   try {
  //     const favorites = await Favorite.findAll({
  //       attributes: ['userId', 'apartmentId', 'createdAt', 'updatedAt'] // Убедитесь, что используете правильные имена колонок
  //     });

  //     res.json(favorites);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Internal server error');
  //   }
  // })
  // .post(verifyAccessToken, async (req, res) => {
  //   try {
  //     await Favorite.create(req.body);

  //     res.sendStatus(200);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).send('Internal server error');
  //   }
  //   favoriteRouter
  .route('/')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const favorites = await Favorite.findAll({
        attributes: ['userId', 'apartmentId', 'createdAt', 'updatedAt'],
      });
      res.json(favorites);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      await Favorite.create(req.body);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });

favoriteRouter
  .route('/:id')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const { id } = req.params;

      if (Number.isNaN(+id)) {
        return res.status(400).json({ message: 'Id must be a number' });
      }

      const favorite = await Favorite.findByPk(id);
      if (!favorite) {
        return res.status(404).json({ message: 'favorite not found' });
      }

      res.json(favorite);
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
      const delFavorite = await User.findByPk(req.params.id);
      // if (!delFavorite) {
      //   return res.status(404).json({ message: 'not found' });
      // }
      // if (delFavorite.userId !== res.locals.user.id) {
      //   return res.status(401).json({ message: 'Unable to complete' });
      // }
      await delFavorite.destroy();
      res.json({ message: 'delFavorite deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = favoriteRouter;
