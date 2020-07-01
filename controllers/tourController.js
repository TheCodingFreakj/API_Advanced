const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const allTours = await Tour.find();

    res.status(200).json({
      status: 'Success',
      results: allTours.length,
      data: {
        allTours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'Sucess',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'Success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};
