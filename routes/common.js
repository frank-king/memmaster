exports.check_user = function(req, res) {
    var user_id = req.session.userId;
    console.log('user_id = ' + user_id);
    if (!user_id || user_id === undefined) {
        res.redirect("/login");
        return;
    }
};