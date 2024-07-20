const express = require('express');
const router = express.Router();
const api = require('../controllers/api.js');
const isLogged = require('../middlewares/isLogged.js')
const isAdmin = require('../middlewares/isAdmin.js')
const forRegister = require('../middlewares/forRegister.js')
const validateForm = require('../middlewares/validacionForm.js')
const apiAuth = require('../middlewares/apiAuth.js')

router.get('/products', api.products.list);
router.get('/products/:id', api.products.detail);
router.get('/users', isAdmin, api.users.all);
router.get('/usersregistro', forRegister, api.users.allregistro);
router.get('/users/:id', isAdmin, api.users.byid);
router.get('/payment', api.payments.all);
router.post('/payment', api.payments.new);
router.put('/payment', isAdmin, api.payments.update);
router.get('/payment/metric', api.payments.metrics);
router.get('/payment/user', api.payments.userPayment);
router.get('/payment/:id', isLogged, api.payments.detail);
router.post('/categories', isAdmin, api.categories.new);
router.get('/user/favorites', api.favorites.user);
router.post('/user/favorites', isLogged, api.favorites.add);
router.post('/user/login', validateForm.login(), apiAuth.getLogin, api.users.login);
router.get('/user/profile', apiAuth.checkLogin, api.users.profile)
router.delete('/user/:id/delete', api.users.delete)
//router.get('/colors', isLogged, api.colors.list)
// router.get('/products', api.products.list);


module.exports = router