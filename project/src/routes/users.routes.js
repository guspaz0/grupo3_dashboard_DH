const express = require('express');
const router = express.Router();
const users = require('../controllers/user');
const validacionForm = require('../middlewares/validacionForm') ;
const upload = require('../middlewares/multerMid');
const jwt = require('../middlewares/jsonwebtoken')
const addCart = require("../middlewares/addCart")

const db = require("../database/models")

router.route('/login')
    .get(users.index)
    .post(validacionForm.login(), users.login);

router.get('/logout', users.logout)

router.route('/register')
    .get(users.getCreateForm)
    .post(upload.any(), validacionForm.registerUser(), users.postCreateForm);

router.get('/restore', users.getRestoreUser);
router.post('/restore', jwt.restorePassToken, users.getRestoreToken);
router.post('/restore/token', jwt.checkToken, validacionForm.restore(), users.restorePassword);

router.get('/profile', users.profile);

router.route('/cart/:id') 
   .post(addCart, users.addCart)
   .delete(users.deleteCart);

router.get('/:id/update', users.getUpdateForm);
router.put('/:id/update', upload.any(), validacionForm.editUser(), users.putUpdateForm);

router.delete('/:id/delete', users.deleteUsers);

router.post("/:id/changepass", users.changePass)

module.exports = router
