var mongoose = require('mongoose');

var event = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  date: Date
});

module.exports = mongoose.model('event', event);