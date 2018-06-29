var check_user = require('./common').check_user;

exports.index = function (req, res) {
    check_user(req, res);
    var user = req.session.user;

    res.render('word_list/word_list.ejs');
};