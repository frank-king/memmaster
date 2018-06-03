var express = require("express");
var app = express();

app.use(express.static('public'));

app.get('/index.html', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get('/login.html', function(request, response) {
    response.sendFile(__dirname + '/login.html');
});

app.post('/user-login', function(request, response) {
    var user = {
        "username": request.query.username,
        "password": request.query.password
    };
    console.log(user);
    response.end(JSON.stringify(user));
});

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("An instance from http://%s:%s", host, port);
});