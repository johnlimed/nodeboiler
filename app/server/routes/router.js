const express = require('express');
const path = require('path');

// const utils  	= require('../modules/utils'),
// 	auth	= require('../modules/auth'),
// 	User 	= require('../models/user');

var router 	= express.Router();

router.get('/', (req, res) => {
  res.send({data: 'hello'});
});

module.exports = router;
