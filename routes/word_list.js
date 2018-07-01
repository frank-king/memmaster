var parse_word_entry = require('./common').parse_word_entry;
var db_words = require('../db/words');

exports.index = function (req, res) {
    if (req.session.user === undefined) {
        res.redirect('/login');
        return;
    }
    var user = req.session.user;

    var type = req.query.word_list_type;
    // if (!type)
    //     type = 'all';

    res.render('word_list.ejs', {type : type});
}

exports.data = function (req, res) {
    if (req.session.user === undefined) {
        res.redirect('/login');
        return;
    }
    var user = req.session.user;

    if (req.method == 'GET') {
        var type = req.query.type;
        if (!type)
            type = 'all';

        console.log(type);
        /*
        var sql = "SELECT * FROM `word_list`";
        switch (type) {
            case 'learnt':
                sql = "SELECT * " +
                    "FROM `word_list` AS word " +
                    "LEFT JOIN `learning` AS learner ON " +
                    "learner.word_id = word.id AND learner.user_id = " + user.id + " " +
                    "WHERE learner.word_id IS NOT NULL";
                break;
            case 'known':
                sql = "SELECT * " +
                    "FROM `word_list` AS word " +
                    "LEFT JOIN `learning` AS learner ON " +
                    "learner.word_id = word.id AND learner.user_id = " + user.id + " " +
                    "WHERE learner.word_id IS NOT NULL AND learner.`familiarity` >= 1.0";
                break;
            case 'all':
            default:
                break;
        }
        console.log(sql);
        var query = db.query(sql, function (err, results) {
            if (err) {
                throw err;
            }
            var words = results.map(function (word) {
                word = parse_word_entry(word);
                return [
                    word.id,
                    word.word,
                    word.meaning === undefined ? "" : word.meaning.join('<br/>'),
                    word.example === undefined ? ""
                        : word.example.map(function (item) {
                            return (item.sentence === undefined ? "" : item.sentence) + '<br/>' +
                                (item.explanation === undefined ? "" : item.explanation);
                        }).join('<br/>'),
                ];
            });
            // console.log(words[0]);
            res.status(200).json({ "data": words });
            // console.log(words);
            // res.render('word_list/word_list.ejs', {words : words, type : type});
        });
        */
        db_words.select_word_list(user, type, function (words) {
            words = words.map(function (word) {
                word = parse_word_entry(word);
                return [
                    word.id,
                    word.word,
                    word.meaning === undefined ? "" : word.meaning.join('<br/>'),
                    word.example === undefined ? ""
                        : word.example.map(function (item) {
                            return (item.sentence === undefined ? "" : item.sentence) + '<br/>' +
                                (item.explanation === undefined ? "" : item.explanation);
                        }).join('<br/>'),
                ];
            });
            // console.log(words[0]);
            res.status(200).json({ "data": words });
        });
    }
    // res.render('word_list/word_list.ejs');
};