const express = require('express');
const mongo = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var request = require('request');

// COnfiguring the dotenv import
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

mongoose.connect(process.env.MLAB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

// index page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Route to save an events
let saveAnEvent = require('./routes/setter');
app.use('/save', saveAnEvent);

// Router to get all saved events
let getListOfEvents = require('./routes/getter');
app.use('/list', getListOfEvents);

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})