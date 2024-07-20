function forRegister (req,res, next) {
    res.locals.login = false
    if (req.query.key === "allUsers" || req.session.user?.admin) {
        next()
    } else {
        res.redirect('/')
    }
}

module.exports = forRegister