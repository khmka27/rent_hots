const { Category } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const express = require('express');

const categoryRouter = express.Router();

categoryRouter
  .route('/')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const categories = await Category.findAll();

      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      await Category.create(req.body);

      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });

categoryRouter
  .route('/:id')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const { id } = req.params;

      if (Number.isNaN(+id)) {
        return res.status(400).json({ message: 'Id must be a number' });
      }

      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: 'category not found' });
      }

      res.json(category);
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
      const delCategory = await Category.findByPk(req.params.id);
      // if (!delCategory) {
      //   return res.status(404).json({ message: 'not found' });
      // }
      // if (delCategory.userId !== res.locals.user.id) {
      //   return res.status(401).json({ message: 'Unable to complete' });
      // }
      await Category.destroy();
      res.json({ message: 'delCategory deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = categoryRouter;
