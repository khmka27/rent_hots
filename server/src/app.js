const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRouter = require('./routes/user.router');
const favoriteRouter = require('./routes/favorite.router');
const apartmentRouter = require('./routes/apartment.router');
const categoryRouter = require('./routes/category.router');
const photoRouter = require('./routes/photo.router');
const authRouter = require('./routes/auth.router');
const tokenRouter = require('./routes/token.router');

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/apartments', apartmentRouter);
app.use('/api/favorites', favoriteRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/photos', photoRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);

module.exports = app;
