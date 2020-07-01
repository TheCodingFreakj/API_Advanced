const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const app = express();

//MIddlewares

//Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Post Body Parser
app.use(express.json());
//static files
app.use(express.static(`${__dirname}/public`));

//resource 1
app.use('/api/v1/tours', tourRouter);

//resource 2
app.use('/api/v1/users', userRouter);

module.exports = app;
