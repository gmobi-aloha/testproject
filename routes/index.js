var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function(e, docs){
    	var name = [];
    	var objKey = Object.keys(docs);

        objKey.forEach(function(objectid){
          var items = Object.keys(docs[objectid]);
          items.forEach(function(itemkey) {
            var itemvalue =docs[objectid][itemkey];
            //console.log(objectid+': '+itemkey+' = '+itemvalue);
            if (itemkey == 'username') {
            	name.push(itemvalue);
            }
          })
        })

        res.render('userlist', {
            "userlist" : name
        });
        console.log(docs);
    });
});

router.get('/adduser', function(req, res) {
	res.render('adduser', {title: 'Add New User'});
});

router.get('/deleteuser', function(req, res) {
	res.render('deleteuser', {title: 'Delete User'});
});

router.get('/modifyuser', function(req, res) {
	res.render('modifyuser', {title: 'Modify User'});
});

module.exports = router;
