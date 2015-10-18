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

/*
router.route('/deleteuser/:id').get(function(req, res) {
   
	var db = req.db;
	var userToDelete = ObjectId(req.params.id);
	var collection = db.get('usercollection');
    
	collection.remove({
		_id: userToDelete
	}, function(err) {
        if (err) { 
        	return res.send(err);
		} 
        res.redirect('/');
	});
});


router.route('/modifyuser').put(function(req, res) {
	 var db = req.db;
	 var userName = req.body.username;
	 var email = req.body.email;
   
	 var collection = db.get('usercollection');

	 collection.update({
		"username": userName
	 }, {$set: {"email": email}}, function(err, doc) {
         if (err) {
             res.send("Error when deleting a user!");
         } else {
         	res.redirect('/');
         } 
	 });
});
*/

module.exports = router;