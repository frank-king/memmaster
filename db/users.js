exports.check_exists = function(username, callback) {
    var sql = "SELECT id, email, username FROM `users` " +
        "WHERE `username`='" + username + "'";
    db.query(sql, function (err, results) {
        if (err) {
            throw err;
        } else if (results) {
            callback();
        }
    });
};

exports.get_user = function(user_id, callback) {
    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

    db.query(sql, function (err, results) {
        callback(results);
    });
}

exports.verify_user = function(username, password, onSucc, onFail) {
    var sql = "SELECT id, email, username FROM `users` " +
        "WHERE `username`='" + username + "' and password = '" + password + "'";
    db.query(sql, function (err, results) {
        if (err) {
            throw err;
        } else if (results) {
            onSucc(results[0]);
        } else {
            onFail();
        }
    });
}

exports.signup = function(username, email, password, callback) {
    var sql = "INSERT INTO `users`(`username`, `email`, `password`)" +
        " VALUES ('" + username + "', '" + email + "', '" + password + "')";

    var query = db.query(sql, function (err) {
        if (err) {
            throw err;
        } else {
            callback();
        }
    });
}