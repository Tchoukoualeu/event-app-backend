const express = require('express');
const router = express.Router();
const Event = require('./../models/event.js');

router.get('/', (req, res) => {  
  Event.find({}, function(err, users) {
    if(err) return console.log(err);    
    res.send(users);  
  });
});

module.exports = router;