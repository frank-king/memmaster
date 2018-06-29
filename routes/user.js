var check_user = require('./common').check_user;
var md5 = require('md5');

var check_exists = function(username, callback) {
    var sql = "SELECT id, email, username FROM `users` " +
        "WHERE `username`='" + username + "'";
    db.query(sql, function (err, results) {
        if (err) {
            throw err;
        }
        if (results) {
            callback();
        }
    });
};

//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function (req, res) {
    message = '';
    if (req.method == "POST") {
        var post = req.body;

        var username = post.user_name;
        var email = post.email;
        var password = md5(post.password);

        check_exists(username, function() {
            message = "Error! user exists.";
            console.log(message);
            res.render('signup.ejs', { message: message });
        });

        var sql = "INSERT INTO `users`(`username`, `email`, `password`)" +
            " VALUES ('" + username + "', '" + email + "', '" + password + "')";

        var query = db.query(sql, function (err, result) {
            message = "Succesfully! Your account has been created.";
            res.render('signup.ejs', { message: message });
            res.redirect('/login');
        });

    } else {
        res.render('signup');
    }
};

//-----------------------------------------------login page call------------------------------------------------------
exports.login = function (req, res) {
    var message = '';
    var sess = req.session;

    if (req.method == "POST") {
        var post = req.body;
        var username = post.user_name;
        var password = md5(post.password);

        var sql = "SELECT id, email, username FROM `users` " +
            "WHERE `username`='" + username + "' and password = '" + password + "'";
        db.query(sql, function (err, results) {
            if (err) {
                throw err;
            }
            console.log(results);
            if (results) {
                req.session.userId = results[0].id;
                req.session.user = results[0];
                console.log(results[0].id);
                res.redirect('/home/dashboard');
            }
            else {
                message = 'Wrong Credentials.';
                res.render('index.ejs', { message: message });
            }
        });
    } else {
        res.render('index.ejs', { message: message });
    }

};
//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.dashboard = function (req, res, next) {
    check_user(req, res);
    var user = req.session.user;
    var userId = req.session.userId;

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

    db.query(sql, function (err, results) {
        res.render('dashboard.ejs', { user: user });
    });
};
//------------------------------------logout functionality----------------------------------------------
exports.logout = function (req, res) {
    req.session = null;
    req.session.destroy(function (err) {
        res.redirect("/login");
    })
};
//--------------------------------render user details after login--------------------------------
exports.profile = function (req, res) {
    check_user(req, res);
    var userId = req.session.userId;

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
    db.query(sql, function (err, result) {
        res.render('profile.ejs', { data: result });
    });
};
//---------------------------------edit users details after login----------------------------------
exports.editprofile = function (req, res) {
    check_user(req, res);
    var userId = req.session.userId;

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
    db.query(sql, function (err, results) {
        res.render('edit_profile.ejs', { data: results });
    });
};
