var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;


/* GET home page. */
router.route('/').get(function(req, res) {
  res.render('index', { title: 'Express' });
});

router.route('/adduser').get(function(req, res) {
  	  res.render('adduser', {title: 'Add New User'});
});

router.route('/modifyuser').get(function(req, res) {
	res.render('modifyuser', {title: 'Modify User'});
});

module.exports = router;