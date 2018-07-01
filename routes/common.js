exports.check_user = function(req, res) {
    var user_id = req.session.userId;
    console.log('user_id = ' + user_id);
    if (!user_id || user_id === undefined) {
        console.log('redirect to /login');
        // console.log(res);
        res.redirect("/login");
    }
};

exports.parse_word_entry = function(word) {
    word.example = word.example.split(/\n/).map(example => {
        var obj = example.split(/\/r\/n/);
        return {
            sentence: obj[0],
            explanation: obj[1],
        };
    });
    word.meaning = word.meaning.split(/<br>\n/);
    return word;
}