const dotenv = require("dotenv")
dotenv.config()
const {JWT_KEY} = process.env
const jwt = require('jsonwebtoken');
const db = require('../database/models')

module.exports = {
    restorePassToken: async function (req,res,next) {
        try {
            const user = await db.Users.findOne({where: {email: req.body.email}, logging: false})
            if (user) {
                const token = jwt.sign({id: user.id}, JWT_KEY, {expiresIn: 60*5})
                req.user = {id: user.id, token: token}
                next()
            } else {
                res.render("users/restore", {token: false, errors: {email: "el usuario no existe"} })
            }
        } catch (error) {
            res.render("users/restore", {token: false})
        }
    },
    checkToken: function (req,res,next) {
        const token = req.body.token
        jwt.verify(token, JWT_KEY, function (err, data) {
            if (err) {
                res.render("users/restore", {token: false, errors: {email: "el Token no es valido o ya expiró"} })
            } else {
                req.user = data
                next()
            }
        })
    }
}