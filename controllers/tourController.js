const Tour = require('./../models/tourModel');

//Middleware to create an alias route

exports.aliasTopTours = (req, res, next) => {
  //change the query object for this route
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage, price';
  req.query.fields = 'name, price, ratingsAverage, summary, difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    //Building the query
    let destructuredQuery = { ...req.query };

    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    //Looping and deleting the excluded fields
    excludedFields.forEach((el) => delete destructuredQuery[el]);

    //console.log(req.query, destructuredQuery);

    //Insert the $expression to the gte variable

    let queryString = JSON.stringify(destructuredQuery);

    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    //console.log(JSON.parse(queryString));

    let query = Tour.find(JSON.parse(queryString));

    //Sort the API

    if (req.query.sort) {
      const sortFields = req.query.sort.split(',').join('  ');
      //console.log(sortFields);
      query = query.sort(sortFields);

      //sort('price, averageRating') Sort by Price and if they are equal sort them by second field
    } else {
      //Default sort by createdAt field
      query = query.sort('-price');
    }

    //Fields

    if (req.query.fields) {
      const selectedFields = req.query.fields.split(',').join('  ');
      // (" name price duration difficulty")
      query = query.select(selectedFields);
    } else {
      query = query.select('-__v');
    }

    //Pagination

    //Set the default of page and limit

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    //Calculate the skip value

    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    //If page requested is greater than available

    if (req.query.page) {
      const totalDocs = await Tour.countDocuments();
      if (skip >= totalDocs) throw new Error("This page don't exist");
    }

    //Creating alias route

    const allTours = await query;

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
