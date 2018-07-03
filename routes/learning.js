var parse_word_entry = require('./common').parse_word_entry;
var db_words = require('../db/words');

exports.index = function (req, res) {
    if (req.session.user === undefined) {
        res.redirect('/login');
        return;
    }
    var user = req.session.user;

    // res.render('learning.ejs');
    res.redirect('/learning/next_word');
};

exports.word = function (req, res) {
    if (req.session.user === undefined) {
        res.redirect('/login');
        return;
    }
    var user = req.session.user;
    if (req.method == 'GET') {
        var body = req.body;
        var action = req.query.action;
        var word_id = req.query.word_id;
        // var url = new URL(req.url);
        // var action = url.searchParams.get('action');
        console.log(action);
        if (action) {
            var familiarity = 0.0;
            if (action == 'know_it')
                familiarity = 1.0;
            else if (action == 'not_sure')
                familiarity = 0.5;
            else if (action == 'not_know')
                familiarity = 0.0;

            /*
            var sql = "INSERT INTO `learning` (" +
                "`user_id`, `word_id`, `learn_date`, `familiarity`) VALUES ( '" +
                user.id + "', '" + word_id + "', current_date(), '" + familiarity + "')";
            console.log(sql);
            var query = db.query(sql, function (err, results) {
                if (err) {
                    throw err;
                }
            });
            */
            db_words.learn_a_word(user, word_id, familiarity, () => { });
            res.redirect('/learning/next_word');
        }
    }
}

exports.next_word = function (req, res) {
    if (req.session.user === undefined) {
        res.redirect('/login');
        return;
    }
    var user = req.session.user;
    if (req.method == 'GET') {
        /*
        var sql = "SELECT * " +
            "FROM `word_list` AS word " +
            "LEFT JOIN `learning` AS learner ON " +
            "learner.word_id = word.id AND learner.user_id = " + user.id + " " +
            "WHERE learner.word_id IS NULL " +
            "LIMIT 1";
        console.log(sql);
        var query = db.query(sql, function (err, results) {
            if (err) {
                throw err;
            }
            if (results) {
                var word = parse_word_entry(results[0]);
                console.log(word);
                res.render('learning.ejs', {word : word});
            } else {
                // No words need to study.
                console.log("no word");
            }
        });
        */
        db_words.learn_next_word(user, function(word) {
            var word = parse_word_entry(word);
            console.log(word);
            res.render('learning.ejs', { word: word });
        }, function() {
            res.render('no_words.ejs', { type: "学习" });
        });
    }
}