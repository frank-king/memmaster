var parse_word_entry = require('./common').parse_word_entry;
var db_words = require('../db/words');

exports.index = function (req, res) {
    if (req.session.user === undefined) {
        res.redirect('/login');
        return;
    }
    var user = req.session.user;

    res.redirect('/review/next_word');
};

exports.word = function (req, res) {
    if (req.session.user === undefined) {
        res.redirect('/login');
        return;
    }
    var user = req.session.user;
    var word_id = req.body.word;
    var correct = req.body.correct;

    console.log(req.body);
    db_words.review_a_word(user, word_id, correct);
    res.end();
}

exports.next_word = function (req, res) {
    if (req.session.user === undefined) {
        res.redirect('/login');
        return;
    }
    var user = req.session.user;

    db_words.review_next_word(user, function (word) {
        var word = parse_word_entry(word);
        console.log(word);
        res.render('review.ejs', { word: word });
    }, function () {
        res.render('no_words.ejs', { type: "复习" });
    });
}