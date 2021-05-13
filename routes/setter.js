const express = require('express');
const router = express.Router();
const Event = require('./../models/event');

router.post('/', (req, res) => {
  const {firstName, lastName, email, date} = req.body;
  
  let event = new Event({
    firstName: firstName,
    lastName: lastName,
    email: email,
    date: date
  });
  
  event.save((err, event) => {
    if(err)return console.log(err)
    res.send('Event Saved')
  });
  
});

module.exports = router;