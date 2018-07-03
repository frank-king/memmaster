var parse_word_list_entry = require('./common').parse_word_list_entry;
var encode_word_entry = require('./common').encode_word_entry;
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

        db_words.select_word_list(user, type, function (words) {
            words = words.map(function (word) {
                return parse_word_list_entry(word);
            });
            // console.log(words[0]);
            res.json({ "data": words });
        });
    }
    // res.render('word_list/word_list.ejs');
};

exports.delete_words = function(req, res) {
    if (req.session.user === undefined) {
        res.redirect('/login');
        return;
    }
    var user = req.session.user;
    var type = req.body.type;
    var word_ids = req.body['word_ids[]'];
    console.log(word_ids);
    db_words.delete_words(user.id, type, word_ids, function () {
        res.status(200).end();
    });
};

exports.edit_or_create_word = function(req, res) {
    if (req.session.user === undefined) {
        res.redirect('/login');
        return;
    }
    var user = req.session.user;
    var word = encode_word_entry({
        id: parseInt(req.body['word[id]']),
        word: req.body['word[word]'],
        meaning: req.body['word[meaning]'],
        example: req.body['word[example]'],
    });

    console.log(word);
    if (word.id) {
        db_words.update_a_word(word, function () {
            word = parse_word_list_entry(word);
            console.log(word);
            res.json(word);
        });
    } else {
        db_words.insert_a_word(word, function (word_id) {
            word.id = word_id;
            word = parse_word_list_entry(word);
            console.log(word);
            res.json(word);
        });
    }
}