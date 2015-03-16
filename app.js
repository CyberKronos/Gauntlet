var express = require('express'),
    challenges = require('./api/challenges'),
    users = require('./api/users');
var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.static(__dirname + '/static'));
    app.use(express.cookieParser())
    app.use(express.cookieSession({secret: 'GwXTbNDf5WjmUmqsBxVIBfwv607WhN5QuWBxjoYT1zx4hkqZOJMl7FTwhqHiGx05'}));
    app.use(express.bodyParser());
});

app.get('/', users.isAuthorized, function (req, res) {
    res.render('index.ejs');
});

app.get('/index', users.isAuthorized, function (req, res) {
    res.render('index.ejs');
});

app.get('/login', function(req, res) {
    if(req.session && req.session.uid) {
        res.redirect('/index');
        res.send();
    }
    res.render('login.ejs');
});

app.get('/signup', function (req, res) {
    if(req.session && req.session.uid) {
        res.redirect('/index');
        res.send();
    }
    res.render('signup.ejs');
});

app.post('/api/users/auth', users.login);
app.post('/api/users/signup', users.signup);

app.get('/api/challenges', users.isAuthorized, challenges.findAll);
app.get('/api/challenges/:id', users.isAuthorized, challenges.findById);
app.post('/api/challenges', users.isAuthorized, challenges.addchallenges);
app.put('/api/challenges/:id', users.isAuthorized, challenges.updatechallenges);
app.delete('/api/challenges/:id', users.isAuthorized, challenges.deletechallenges);
app.get('/api/users/:id', users.isAuthorized, users.findById);
app.get('/api/users', users.isAuthorized, users.findAll);
app.get('/api/users/logout', users.isAuthorized, users.logout);

app.listen(3000);