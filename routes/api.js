var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;


//Restful APIs
router.route('/users')
  .get(function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function(err, docs){
    	if (err) {
    		return res.send(err);
    	}
        res.json(docs);
    });
  })
  
  .post(function(req, res) {
	  var db = req.db;
	  var userName = req.body.username;
	  var Email = req.body.email;

	  var collection = db.get('usercollection');

	  collection.insert({
	 	  "username" : userName,
		  "email" : Email
	  }, function(err) {
		  if (err) {
             return res.send(err);
		  } 
		  res.json({ message: 'User Added'});
	  });
  });

router.route('/users/:id')
  .delete(function(req, res) {
    var db = req.db;
	  var userToDelete = ObjectId(req.params.id);
	  var collection = db.get('usercollection');
    
	  collection.remove({
		  _id: userToDelete
	  }, function(err) {
        if (err) { 
        	return res.send(err);
		} 
        res.json({message: 'User Deleted'});
	  });
  })

  .put(function(req, res) {
  	var db = req.db;
  	var userToUpdate = ObjectId(req.params.id);
	  var email = req.body.email;
   
	  var collection = db.get('usercollection');

	  collection.update({
		  _id: userToUpdate
	  }, {$set: {"email": email}}, function(err, doc) {
         if (err) {
             res.send(err);
         } else {
         	res.json({message: 'User Updated'});
         } 
	  });
  });

module.exports = router;  