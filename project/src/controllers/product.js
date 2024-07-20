const path = require('path');
const users = require('../models/user');
const products = require('../models/products');
const categories = require('../models/categories');
const colors = require('../models/colors');
const favorites = require('../models/favorites');
const images = require('../models/images')
const fs = require('fs');
const {validationResult} = require('express-validator');


const view = path.join(__dirname,'../views/products/');

module.exports = {
    index: async function (req,res) {
        try {
            const allProduct = await products.all()
            const allCategories = await categories.countAll()
            const allColors = await colors.countAll()
            let Favs = []
            if (req.session.user) Favs = await favorites.userFav(req.session.user.id)
            res.render(view+'products', { 
                productos: allProduct,
                categorias: allCategories,
                colors: allColors,
                favoritos: Favs
            })
        } catch (error) {
            res.status(500).json(error.message)
        }

    },
    filter: async function (req,res) {
        try {
            let Favs = []
            if (req.session.user) {
                Favs = await favorites.userFav(+req.session.user.id);
                if (req.query.favorites) req.query.favorites = +req.session.user.id;
            }
            res.render(view+'products', { 
                productos: await products.filter(req.query),
                categorias: await categories.countAll(),
                colors: await colors.countAll(),
                favoritos: Favs
            })
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    detail: async function (req,res) {
        try {
            const detalle = await products.detail(req.params.id)
            if (detalle) {
                if(req.session.user) {
                    res.render(view+'detail',{ 
                        detalle: detalle, user: true, 
                        favorites: await favorites.userFav(req.session.user.id) })
                } else {
                    res.render(view+'detail',{ detalle: detalle , user: false, favorites: [] })
                }
            }
            else res.render('404notFound', {url: req.url}) // si no encuentra el producto, devuelve 404
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    getCreateForm: async function(req,res) {
        try {
            res.render(view+'createForm', {
                productEdit: null,
                categorias: await categories.all(),
                body: {}
            })
        } catch (error) {
            res.status(500).json(error.message)
        }

    },
    postCreateForm: async function (req,res) {
        try {
            const errores = validationResult(req)
            if (errores.isEmpty()) {
                const newProduct = await products.create(req.body, req.files)
                if (newProduct) {
                    res.status(200).redirect(`/products/${newProduct.id}`)
                }
            } else {
                if (req.files) {
                    req.files = images.parsePath(req.files)
                }
                res.render(view+'createForm', {
                    productEdit: null,
                    body: {...req.body, files: req.files},
                    categorias: await categories.all(),
                    errors: errores.mapped() 
                })
            }
        } catch (error) {
            res.status(500).json(error.message)
        }

    },
    update: async function (req, res) {
        try {
            let {id} = req.params
            const errores = validationResult(req)
            if (errores.isEmpty()) {
                const response = await products.edited({id: +id, ...req.body},req.files)
                if (response) {
                    res.status(200).redirect(`/users/profile`)
                }
            } else {
                let newImage = []
                const product = await products.detail(id)
                if (req.files) newImage = Array.isArray(req.files)? req.files.map((img) => {return img.path.split('public')[1]}) : [req.files.path.split('public')[1]];

                res.render(`${view}/editForm`, {
                    productEdit: {...req.body, image: [...newImage, ...product.images]},
                    categorias: await categories.all(),
                    message: null,
                    errors: errores.mapped()
                })
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    edit: async function (req,res) {
        try{
            if(req.query.message === "editado"){
                res.status(200).render(`${view}/editForm`, {
                    productEdit: await products.detail(req.params.id),
                    categorias: await categories.all(),
                    message: req.query
                }) 
            } else {    
                res.render(`${view}/editForm`, {
                    productEdit: await products.detail(req.params.id),
                    categorias: await categories.all(),
                    message: null
                })
            }}
        catch(error){
            res.status(500).send(error.message)
        }
    }, 
    delete: async function (req,res) {
        try {
            const {id} = req.params
            const responseDelete = await products.remove(+id)
            if (responseDelete) {
                res.status(200).redirect('/users/profile');
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}
