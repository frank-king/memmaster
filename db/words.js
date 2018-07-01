exports.learn_a_word = function (user, word_id, familiarity, callback) {
    var sql = "INSERT INTO `learning` (" +
        "`user_id`, `word_id`, `learn_date`, `familiarity`) VALUES ( '" +
        user.id + "', '" + word_id + "', current_date(), '" + familiarity + "')";
    console.log(sql);
    var query = db.query(sql, function (err, results) {
        if (err) {
            throw err;
        }
        callback();
    });
};

exports.learn_next_word = function (user, callback) {
    var sql = "SELECT * " +
        "FROM `word_list` AS word " +
        "LEFT JOIN `learning` AS learner ON " +
        "(learner.word_id = word.id AND learner.user_id = " + user.id + ") " +
        "WHERE (learner.word_id IS NULL) ORDER BY RAND() LIMIT 1";
    console.log(sql);
    var query = db.query(sql, function (err, results) {
        if (err) {
            throw err;
        } else if (results) {
            callback(results[0]);
        } else {
            // No words need to study.
            console.log("no word");
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
        "ORDER BY RAND() LIMIT 1";
    console.log(sql);
    var query = db.query(sql, function (err, results) {
        if (err) {
            throw err;
        } else if (results) {
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
        selects[0] + ', ' + selects[1] + ' ' +
        "FROM `learning` " +
        "WHERE `user_id` = " + user_id;
    var query = db.query(sql, function (err, results) {
        if (err) {
            throw err;
        } else {
            callback(results[0][selects[0]], results[0][selects[1]]);
        }
    })
}