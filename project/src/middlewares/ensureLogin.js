function ensureLogin (req,res, next) {
    res.locals.login = false
    if (req.session.user) {
        res.locals = { login: true, admin: req.session.user.admin, user: {id: req.session.user.id} }
    }
    next()
}

module.exports = ensureLogin