var mongo = require('mongodb');
var users = require('./users');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true, j: true});
db = new Db('gauntlet', server, {journal:true});

/**
 *

 title: '',
 type: ''.
 comments: [
 {
			name: '',
			comment:''
		}
],
from: '', // this is a
    to: '',
    status: 'pending' // pending | in-process | done

 */


db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'gauntlet' database");
        db.collection('challenges', {strict:true}, function(err, collection) {
            if (err) {
//                console.log("The 'challenges' collection doesn't exist. Creating it with sample data...");
//                populateDB();
            }
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving challenges: ' + id);
    db.collection('challenges', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, results) {
            results.toArray(function(err, challenge) {
                res.send(challenge);
            });
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('challenges', function(err, collection) {
        collection.find({}, function(err, results){
           results.toArray(function(err, challenges) {
               res.send(challenges);
           });
        });
    });
};
 
exports.addchallenges = function(req, res) {
    var challenges = req.body;
    console.log('Adding challenges: ' + JSON.stringify(challenges));
    db.collection('challenges', function(err, collection) {
        collection.save(challenges, function(err, result) {
            if (err) {
                console.log(err);
                res.status(400);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result));
                res.send(result);
            }
        });
    });
};
 
exports.updatechallenges = function(req, res) {
    var id = req.params.id;
    var challenges = req.body;
    for (var key in challenges) {
        if (key == '_id') {
            challenges[key] = new BSON.ObjectID(id);
        }
    }
    console.log('Updating challenges: ' + id);
    console.log(JSON.stringify(challenges));
    db.collection('challenges', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, challenges, function(err, result) {
            if (err) {
                console.log('Error updating challenges: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(challenges);
            }
        });
    });
};
 
exports.deletechallenges = function(req, res) {
    var id = req.params.id;
    console.log('Deleting challenges: ' + id);
    db.collection('challenges', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(204);
            }
        });
    });
};

var defaultChallenges = [
    {},{},{}

];