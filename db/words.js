exports.learn_a_word = function (user, word_id, familiarity, callback) {
    var sql = "INSERT INTO `learning` (" +
        "`user_id`, `word_id`, `learn_date`, `familiarity`) VALUES ( '" +
        user.id + "', '" + word_id + "', current_date(), '" + familiarity + "')";
    console.log(sql);
    var query = db.query(sql, function (err, results) {
        if (err) {
            throw err;
        } else {
            callback();
        }
    });
};

exports.learn_next_word = function (user, callback, finished) {
    var sql = "SELECT * " +
        "FROM `word_list` AS word " +
        "LEFT JOIN `learning` AS learner ON " +
        "(learner.word_id = word.id AND learner.user_id = " + user.id + ") " +
        "WHERE (learner.word_id IS NULL) ORDER BY RAND() LIMIT 1";
    console.log(sql);
    var query = db.query(sql, function (err, results) {
        if (err) {
            throw err;
        } else if (results.length > 0) {
            callback(results[0]);
        } else {
            finished();
        }
    });
};

exports.review_a_word = function (user, word_id, correct, callback) {
    var sql = "UPDATE `learning` " +
        "SET `familiarity` = (`familiarity` + " + correct + ") / 2.0, " +
        "review_date = current_date() " +
        "WHERE (`user_id` = " + user.id + " AND `word_id` = " + word_id + ")";
    console.log(sql);
    var query = db.query(sql, function (err, results) {
        if (err) {
            throw err;
        }
        if (!callback === undefined) {
            callback();
        }
    });
};

exports.review_next_word = function (user, callback, finished) {
    var sql = "SELECT * " +
        "FROM `word_list` AS word " +
        "LEFT JOIN `learning` AS learner ON " +
        "(learner.word_id = word.id AND learner.user_id = " + user.id + ") " +
        "WHERE (learner.word_id IS NOT NULL AND learner.`familiarity` < 0.9" +
        "AND (learner.review_date IS NULL OR learner.review_date < current_date())) " +
        "ORDER BY `familiarity` LIMIT 1";
    console.log(sql);
    var query = db.query(sql, function (err, results) {
        if (err) {
            throw err;
        } else if (results.length > 0) {
            callback(results[0]);
        } else {
            finished();
        }
    });
};

exports.select_word_list = function (user, type, callback) {
    var sql = "SELECT * FROM `word_list`";
    switch (type) {
        case 'learnt':
            sql = "SELECT * " +
                "FROM `word_list` AS word " +
                "LEFT JOIN `learning` AS learner ON " +
                "(learner.word_id = word.id AND learner.user_id = " + user.id + ") " +
                "WHERE (learner.word_id IS NOT NULL)";
            break;
        case 'known':
            sql = "SELECT * " +
                "FROM `word_list` AS word " +
                "LEFT JOIN `learning` AS learner ON " +
                "(learner.word_id = word.id AND learner.user_id = " + user.id + ") " +
                "WHERE (learner.word_id IS NOT NULL AND learner.`familiarity` >= 0.9)";
            break;
        case 'all':
        default:
            break;
    }
    console.log(sql);
    var query = db.query(sql, function (err, results) {
        if (err) {
            throw err;
        } else {
            callback(results);
        }
    });
};

exports.summary_today = function (user_id, callback) {
    var selects = [
        'SUM(`learn_date` = current_date())',
        'SUM(`review_date` = current_date())',
    ];
    var sql = "SELECT DISTINCT " +
        selects.join(', ') + ' ' +
        "FROM `learning` " +
        "WHERE `user_id` = " + user_id;
    var query = db.query(sql, function (err, results) {
        // console.log(results);
        if (err) {
            throw err;
        } else {
            callback(results[0][selects[0]], results[0][selects[1]]);
        }
    });
};

exports.summary_all = function (user_id, callback) {
    var selects = [
        'SUM(`learn_date` IS NOT NULL)',
        'SUM(`familiarity` >= 0.9)',
    ];
    var sql = "SELECT DISTINCT " +
        selects.join(', ') + ' ' +
        "FROM `learning` " +
        "WHERE `user_id` = " + user_id;
    var query = db.query(sql, function (err, results) {
        if (err) {
            throw err;
        } else {
            callback(results[0][selects[0]], results[0][selects[1]]);
        }
    });
};

exports.delete_words = function (user_id, type, word_ids, callback) {
    if (!Array.isArray(word_ids))
        word_ids = [word_ids];
    var sql = "DELETE FROM `word_list` WHERE (`id` IN (" + word_ids.join(', ') + "))";
    switch (type) {
        case 'learnt':
            sql = "DELETE FROM `learning` " +
                "WHERE (`user_id` = " + user_id + " AND " +
                "`word_id` IN (" + word_ids.join(', ') + "))";
            break;
        case 'known':
            sql = "UPDATE `learning` " +
                "SET `familiarity` = 0.0, `review_date` = NULL " +
                "WHERE (`user_id` = " + user_id + " AND " +
                "`word_id` IN (" + word_ids.join(', ') + "))";
            break;
        case 'all':
        default:
            break;
    }
    console.log(sql);
    var query = db.query(sql, function (err, results) {
        if (err) {
            throw err;
        } else {
            callback();
        }
    });
};

exports.update_a_word = function (word, callback) {
    var sql = "UPDATE `word_list` " +
        "SET `word` = '" + word.word + "', " +
        "`meaning` = '" + word.meaning.replace(/'/g, "\\'") + "', " +
        "`example` = '" + word.example.replace(/'/g, "\\'") + "' " +
        "WHERE (`id` = " + word.id + ")";
    console.log(sql);
    var query = db.query(sql, function (err, results) {
        if (err) {
            throw err;
        } else {
            callback();
        }
    });
};

exports.insert_a_word = function (word, callback) {
    var sql = // "START TRANSACTION;\n" +
        "INSERT INTO `word_list` (" +
        "`word`, `meaning`, `example`) VALUES ('" +
        word.word + "', '" + word.meaning + "', '" + word.example + "')"; // ;\n" +
        // "SELECT * FROM `word_list` WHERE (`id` = last_insert_id());\n" +
        // "COMMIT;";
    console.log(sql);
    var query = db.query(sql, function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log(results);
            callback(results.insertId);
        }
    });
};