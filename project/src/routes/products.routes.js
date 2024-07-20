const express = require('express');
const router = express.Router();
const products = require('../controllers/product');
const upload = require('../middlewares/multerMid');
const isAdmin = require('../middlewares/isAdmin')
const validacionProducts = require('../middlewares/validacionProducts');

router.route('/')
    .get(products.index)  // para primera vista o resetear filtro
;

router.get('/filter', products.filter);

router.route('/create') 
    .get(isAdmin, products.getCreateForm)
    .post(isAdmin, upload.any(),
        validacionProducts.formProducto(),
        products.postCreateForm
    )
;

router.route('/:id/edit')
    .get(isAdmin, products.edit) // para renderizar al front el form edit de producto
    .put(isAdmin, upload.any(),
        validacionProducts.formProducto(),
        products.update
    )
; 

router.route('/:id/delete')
    .delete(isAdmin, products.delete)
;

router.route('/:id')
    .get(products.detail) // esta es para el detalle, entra en el ultimo else del controller
;

module.exports = router