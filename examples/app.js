var express = require('express'),
    passport = require('passport'),
    util = require('util'),
    SmartThingsStrategy = require('passport-smartthings').Strategy,
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');

var SMARTTHINGS_CLIENT_ID = process.env.SMARTTHINGS_CLIENT_ID || "--insert-smartthings-client-id-here--"
var SMARTTHINGS_CLIENT_SECRET = process.env.SMARTTHINGS_CLIENT_SECRET || "--insert-smartthings-client-secret-here--";

passport.use(new SmartThingsStrategy(
    {
        clientID: SMARTTHINGS_CLIENT_ID,
        clientSecret: SMARTTHINGS_CLIENT_SECRET
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

var app = express();

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use(cookieParser('cookie_secret'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'session_secret',
    resave: true,
    saveUninitialized: false
}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('index', {});
});

app.get('/dashboard', function(req, res){
    console.log('My Smart Things profile', req.session.passport.user);
    res.render('dashboard', {});
});

app.get('/auth/smartthings', passport.authenticate('smartthings', { scope: ['app'] }));

app.get(
    '/auth/smartthings/callback',
    passport.authenticate('smartthings', { scope: ['app'] }),
    function(req, res) { res.redirect('/dashboard'); }
);

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.listen(3000);

console.log('Listening on port 3000');
