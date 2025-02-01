const { User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const express = require('express');

const userRouter = express.Router();

userRouter
  .route('/')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const users = await User.findAll();

      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      await User.create(req.body);

      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });

userRouter
  .route('/:id')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const { id } = req.params;

      if (Number.isNaN(+id)) {
        return res.status(400).json({ message: 'Id must be a number' });
      }

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'xxx_ not found' });
      }

      res.json(user);
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
      const delUser = await User.findByPk(req.params.id);
      // if (!delUser) {
      //   return res.status(404).json({ message: 'not found' });
      // }
      // if (delUser.userId !== res.locals.user.id) {
      //   return res.status(401).json({ message: 'Unable to complete' });
      // }
      await delUser.destroy();
      res.json({ message: 'delxxx_ deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = userRouter;
