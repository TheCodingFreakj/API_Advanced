const mongoose = require('mongoose');

//creating the schema

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You have not given a unique name'],
    unique: true,
    trim: true,
  },

  duration: {
    type: Number,
    required: [true, 'Why no duration mentions?'],
  },

  maxGroupSize: {
    type: Number,
    required: [true, ' You must give a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'You should give the difficulty level'],
  },
  price: {
    type: Number,
    required: [true, 'Please tel me the price'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },

  ratingsQuantity: {
    type: Number,
    default: 4.5,
  },

  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'GIve a description for the package tour'],
  },

  imageCover: {
    type: String,
    required: [true, 'Provide an image cover please'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

//Creating the model or collection
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
