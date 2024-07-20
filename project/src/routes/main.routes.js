const express = require('express')
const router = express.Router()
const main = require('../controllers/main')

router.route('/')
    .get(main.getHome);

router.route('/cart')
    .get(main.getCart)
    

router.route("/contacto")
    .get(main.getContacto)
    .post(main.postContacto)
;
router.route("/about")
    .get(main.getAbout)
;
router.route("/autor")
    .get(main.getAutor)
;

module.exports = router