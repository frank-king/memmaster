var check_user = require('./common').check_user;

exports.index = function (req, res) {
    check_user(req, res);
    var user = req.session.user;

    // res.render('learning.ejs');
    res.redirect('/learning/next_word');
};

exports.word = function (req, res) {
    check_user(req, res);
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

            var sql = "INSERT INTO `learning` (" +
                "`user_id`, `word_id`, `learn_date`, `familiarity`) VALUES ( '" +
                user.id + "', '" + word_id + "', current_date(), '" + familiarity + "')";
            console.log(sql);
            var query = db.query(sql, function (err, results) {
                if (err) {
                    throw err;
                }
            });
            res.redirect('/learning/next_word');
        }
    }
}

exports.next_word = function (req, res) {
    check_user(req, res);
    var user = req.session.user;
    if (req.method == 'GET') {
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
                var word = results[0];
                var examples = word.example.split(/\n/).map(example => {
                    var obj = example.split(/\/r\/n/);
                    return {
                        sentence: obj[0],
                        explanation: obj[1],
                    };
                });
                word.example = examples;
                word.meaning = word.meaning.split(/<br>\n/);
                console.log(word);
                res.render('learning.ejs', {word : word});
            } else {
                // No words need to study.
                console.log("no word");
            }
        });
    }
}