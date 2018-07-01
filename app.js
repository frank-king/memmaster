/**
* Module dependencies.
*/
var express = require('express');
var http = require('http');
var path = require('path');
// var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes');
var user = require('./routes/user');
var learning = require('./routes/learning');
var word_list = require('./routes/word_list');

var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  database: 'words'
});
connection.connect();

global.db = connection;

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}))

// development only
app.get('/', routes.index); // call for main index page
app.get('/signup', user.signup); // call for signup page
app.post('/signup', user.signup); // call for signup post 
app.get('/login', routes.index); // call for login page
app.post('/login', user.login); // call for login post
app.get('/home/dashboard', user.dashboard); // call for dashboard page after login
app.get('/home/logout', user.logout); // call for logout
app.get('/home/profile', user.profile); // to render users profile

app.get('/learning', learning.index);
app.get('/learning/word', learning.word);
app.get('/learning/next_word', learning.next_word);

app.get('/word_list', word_list.index);
app.get('/word_list/data', word_list.data);
// Middleware
app.listen(8080);
