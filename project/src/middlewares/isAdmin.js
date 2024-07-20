function isAdmin (req,res, next) {
    res.locals.login = false
    if (req.user?.token) {
        next()
    }
    else if (req.session.user?.admin) {
        res.locals = { login: true, admin: req.session.user.admin, user: {id: req.session.user.id} }
        next()
    } else {
        res.redirectUrl = '/products/create'
        res.redirect('/users/login')
    }
}

module.exports = isAdmin