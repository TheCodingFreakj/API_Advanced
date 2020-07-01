const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
dotenv.config({ path: './config.env' });

//console.log(process.env);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

//Connect the mongoose to the app

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('Blazintrails database is connected to the app');
  });

//Read the json file from the  document and convert to js
var tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8')
);
//Using monggose create(), use the const that store the file data to import data

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('The data is loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
//Delete any previous file

const deleteData = async () => {
  try {
    await Tour.deleteMany();

    console.log('The previous data is deleted');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};
//Use process.argv in cli to import and dont call the function
//console.log(process.argv);
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
