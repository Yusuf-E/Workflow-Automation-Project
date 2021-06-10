module.exports = (req, res, next) => {
    if (!req.session.isAuthenticated) {
        return res.redirect('/');
    }
    if (!req.user.isAdmin) {
        return res.redirect('/index');
    }
    next();
}