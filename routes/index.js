var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.route('/userlist').get(function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/adduser', function(req, res) {
	res.render('adduser', {title: 'Add New User'});
});

router.route('/adduser').post(function(req, res) {
	var db = req.db;

	var userName = req.body.username;
	var Email = req.body.email;

	var collection = db.get('usercollection');

	collection.insert({
		"username" : userName,
		"email" : Email
	}, function(err, doc) {
		if (err) {
            return res.send("Error when adding a new account!")
		} 
		//res.send({ message: 'User Added'});
		res.redirect('/');
	});
});


var ObjectId = require('mongodb').ObjectID;
router.route('/deleteuser/:id').get(function(req, res) {
   
    console.log("Coming to delete");	
	var db = req.db;
	var userToDelete = ObjectId(req.params.id);
	var collection = db.get('usercollection');
    
	collection.remove({
		_id: userToDelete
	}, function(err) {
        if (err) { 
        	return res.send(err)
		} 
        //res.json({message: 'Successfully deleted'});
        res.redirect('/');
	});
});

router.route('/deleteuser/:id').delete(function(req, res) {
   
    console.log("Coming to Restful delete ");	
	var db = req.db;
	var userToDelete = ObjectId(req.params.id);
	var collection = db.get('usercollection');
    
	collection.remove({
		_id: userToDelete
	}, function(err) {
        if (err) { 
        	return res.send(err)
		} 
        res.json({message: 'Successfully deleted'});
	});
});

router.get('/modifyuser', function(req, res) {
	res.render('modifyuser', {title: 'Modify User'});
});

router.post('/modifyuser/', function(req, res) {
	var db = req.db;
	var userName = req.body.username;
	var Email = req.body.email;
   
	var collection = db.get('usercollection');

	collection.update({
		"username": userName
	}, {$set: {"email": Email}}, function(err, doc) {
        if (err) {
            res.send("Error when deleting a user!");
        } else {
        	res.redirect('/');
        } 
	});
});

module.exports = router;
