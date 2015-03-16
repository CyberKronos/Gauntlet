var mongo = require('mongodb');
var crypto = require('crypto');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('gauntlet', server, {journal:true});

/**
 * Users Schema looks like this:
 *
   'name' // string
   'email' // string
   'password' // pbkdf2 hash function string in base64
   'salt' // salt for the hash in base64
 *
 */
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'gauntlet' database");
        db.collection('users', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
                var defaultUsers = createDefaultUsers();
                db.collection('users').insert(defaultUsers, function(err, result) {
                    if(err) {
                        console.log('buster!');
                    } else {
                        console.log('Inserted ' + defaultUsers.length + ' users.');
                    }
                });
            }
        });
    }
});

exports.login  = function(req, res) {
    if(req.session && req.session.uid) {
        res.status(302);
        res.location('/index');
        res.send();
    }
    if (!req.body.email || !req.body.password) {
        res.status(302);
        res.location('/login');
        res.render('login.ejs');
        res.send();
    }
    else {
        authenticateUser(req.body.email, req.body.password, function(valid, uid) {
            if(!valid) {
                res.status(401);
                res.send();
            }
            else {
                req.session.uid = uid;
                res.status(302);
                res.location('/index');
                res.send();
            }
        });
    }

};

exports.signup = function(req, res) {
    if(req.session && req.session.uid) {
        res.redirect(302, '/index');
        res.send();
    }
    if (!req.body.email || !req.body.password || !req.body.password_confirm || !req.body.username || req.body.password != req.body.password_confirm ) {
        res.status(302);
        res.location('/signup');
        res.send();
    }
    else {
        var creds = hashPassword(req.body.password);
        var user = {
            'name'     : req.body.username,
            'email'    : req.body.email,
            'password' : creds.cryptedPass,
            'salt'     : creds.salt
        };
        db.collection('users', function(err, collection) {
            collection.insert(user, function(err, result) {
                if (err) {
                    res.send(500, {'error':'An error has occurred'});
                } else {
//                    console.log('Success: ' + JSON.stringify(result[0]));
                    req.session.uid = result[0]._id;
                    res.status(302);
                    res.location('/index');
                    res.send();
                }
            });
        });
    }
};
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving users: ' + id);
    db.collection('users', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, {
            "name": true,
            "email" : true
        }, function(err, results) {
            results.toArray(function(err, user) {
                res.send(user);
            });
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find({}, {
            "name": true,
            "email" : true
        }, function(err, results) {
            results.toArray(function(err, users) {
                res.send(users);
            });
        })
    });
};
 
exports.addusers = function(req, res) {
    var users = req.body;
    console.log('Adding users: ' + JSON.stringify(users));

};
 
exports.updateusers = function(req, res) {
    var id = req.params.id;
    var users = req.body;
    console.log('Updating users: ' + id);
    console.log(JSON.stringify(users));
    db.collection('users', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, users, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating users: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(users);
            }
        });
    });
};
 
exports.deleteusers = function(req, res) {
    var id = req.params.id;
    console.log('Deleting users: ' + id);
    db.collection('users', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};

var hashPassword = function(password)  {
    var salt = crypto.randomBytes(12).toString('base64');
    var cryptedPass = crypto.pbkdf2Sync(password, salt, 2048, 512).toString('base64');
    return {
        salt: salt,
        cryptedPass: cryptedPass
    };
};

var createDefaultUsers = function() {

    var default_password = 'h0h0h0Hackath0n';

    var alexSalt = crypto.randomBytes(12).toString('base64');
    var denisSalt = crypto.randomBytes(12).toString('base64');
    var edSalt = crypto.randomBytes(12).toString('base64');

    var alexCryptedPass = crypto.pbkdf2Sync(default_password, alexSalt, 2048, 512).toString('base64');
    var denisCryptedPass = crypto.pbkdf2Sync(default_password, denisSalt, 2048, 512).toString('base64');
    var edCryptedPass = crypto.pbkdf2Sync(default_password, edSalt, 2048, 512).toString('base64');

    return [
        {
            'name'     : 'Alex',
            'email' : 'alex.nguyen@invokelabs.com',
            'password' : alexCryptedPass,
            'salt'     : alexSalt
        },
        {
            'name'     : 'Denis',
            'email' : 'denis.dymov@invokelabs.com',
            'password' : denisCryptedPass,
            'salt'     : denisSalt
        },
        {
            'name'     : 'Ed',
            'email' : 'ed.epstein@invokelabs.com',
            'password' : edCryptedPass,
            'salt'     : edSalt
        }
    ];
};

var hasSession = function(req, res, next) {
    if (req.session.uid) {
//        console.log('has session as ' + req.session.uid);
        next();
    }
    else {
        res.status(302);
        res.location('/login');
        res.send();
    }
};

exports.isAuthorized = hasSession;

exports.logout = function(req, res) {
  if(req.session.uid) {
      req.session.uid = null;
  }
    res.status(302);
    res.location('/login');
    res.send();
};

var authenticateUser = function (email, password, callback){
    findByEmail(email, function (err, user) {
        if (!err && user) {
            var userPass = crypto.pbkdf2Sync(password, user.salt, 2048, 512).toString('base64');
            callback((userPass == user.password), user._id);
        }
        else {
            callback(null);
        }
    });
};

var findByEmail = function(email, callback) {
    db.collection('users').findOne({email: email}, function(err, user) {
        if(!err && user) {
            callback(err, user);
        }
        else {
            callback(err, null)
        }
    });
};