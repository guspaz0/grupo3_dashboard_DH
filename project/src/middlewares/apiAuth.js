const dotenv = require("dotenv")
dotenv.config()
const {JWT_KEY} = process.env
const jwt = require('jsonwebtoken');
const db = require('../database/models')
const {validationResult} = require('express-validator')

module.exports = {
    getLogin: function (req,res,next) {
        const errores = validationResult(req)
        if (errores.isEmpty()) {
            db.Users.findOne({where: {email: req.body.email}, logging: false})
            .then(user => {
                if (user) {
                    if (user.admin == 1) {
                        const token = jwt.sign({id: user.id}, JWT_KEY, {expiresIn: 60*30})
                        req.user = {token}
                        next()
                    } else {
                        req.user = false
                        next()
                    }
                } else {
                    next()
            }})
        } else {
            next()
        }
    },
    checkLogin: function (req,res,next) {
        const token = req.headers['authorization']
        jwt.verify(token, JWT_KEY, function (err, data) {
            if (err) {
                req.user.token = false
                next()
            } else {
                req.user = {...data, token: true}
                next()
            }
        })
    },
    isAuthenticated: function (req,res,next) {
        const publicRoutes = ['/products', '/user/login']
        if (publicRoutes.includes(req.url.split('?')[0])) {  
            next()
        } else if (req.headers?.authorization) {
            const token = req.headers['authorization']
            jwt.verify(token, JWT_KEY, function (err, data) {
                if (err) {
                    res.status(401).send({access: false, error: "NotAuthorized"})
                } else {
                    req.user = {id: data.id, token: true}
                    next()
                }
            })
        } else if (req.session.user) {
            next()
        } else {
            res.status(401).send({access: false, error: "NotAuthorized"})
        }
    }
}