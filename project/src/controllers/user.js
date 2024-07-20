const payments = require('../models/payments');
const db = require('../database/models')
const dataGeo = require('../models/dataGeo');
const products = require('../models/products');
const users = require('../models/user');
const favoritos = require('../models/favorites');
const { check, validationResult } = require('express-validator');

module.exports = {
    index: function (req, res) {
        res.render('users/login', {
            body: {},
            errors: {}
        })
    },
    profile: async function (req,res){
        try {
            const userId = req.session.user?.id
            res.render('users/profile', {
                userData: await users.detail(userId),
                productos: await products.all(),
                historialPagos: await payments.userDetail(userId, 5, 1),
                favoritos: await favoritos.userFav(userId)
            })
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    login: async function (req,res) {
        const errores = validationResult(req)
        if (errores.isEmpty()) {
            const user = await users.login(req.body)
            if (user.access) {
                req.session.user = user? user : {};
                
                if(req.body.recordame != undefined){
                    const oneDayInMillis = 24 * 60 * 60 * 1000;
                    res.cookie('recordame', user.email, { expires: new Date(Date.now() + oneDayInMillis), httpOnly: true });
                }
                res.status(200).redirect('/')
            } else {
                res.render('users/login', {
                    body: {},
                    errors: {login: user.error}
                })
            }
        } else {
            res.render('users/login', {
                body: req.body,
                errors: errores.mapped()
            })
        } 
    },
    logout: function (req,res) {
        delete req.session.user
        res.clearCookie('recordame');
        res.redirect('/')
    },
    getCreateForm: function (req,res) {
        res.render('users/register', {
            body: {},
            localidades: dataGeo.localidades()
        })
    },
    postCreateForm: async function (req,res) {
      try{
        const errores = validationResult(req)
        if (errores.isEmpty()) {
            const newUser = await users.create(req.body, req.files)
            if (newUser) {
                req.session.user = newUser
                res.redirect(`/`)
            }
        } else { 
            res.render('users/register', {
                body: req.body,
                localidades: dataGeo.localidades(),
                errors: errores.mapped()
            })
        }}catch(error){throw new Error(error)}
    },
    getUpdateForm: async function (req,res) {
        try{
        res.render('users/edit-user', { 
            userData: await users.detail(req.params.id),
            localidades: dataGeo.localidades(),
            body: {}
        })}
        catch(error) {throw new Error(error)}
    },
    putUpdateForm: async function (req,res) {
        try {
            const id = req.params.id
            const errores = validationResult(req)
            if (errores.isEmpty()) {
                const updatedData = await users.update({id: parseInt(id), ...req.body, imagen: req.files })
                if (updatedData) {
                    res.redirect('/users/profile')
                }
            } else {
                res.render('users/edit-user', { 
                    userData: users.detail(id),
                    localidades: dataGeo.localidades(),
                    body: req.body,
                    errors: errores.mapped()
                })
            }
        } catch (error) {
            throw new Error(error)
        }
    },
    getRestoreUser: function (req,res) {
        res.render('users/restore', {token: false})
    },
    postRestoreUser: function (req,res) {
        res.render('404notfound',{url: req.url})
    },
    addCart: async function(req,res){
        try {
            const response = await users.cartAdd({body: req.body, id: req.session?.user.id})
    
          if(response){
            res.status(200).json({ success: true, message: 'Producto agregado al carrito correctamente' });
          }
          else{
            res.status(409).json({ success: false, message: 'El producto con ese color ya fue agregado al carrito, seleccione otro color' });
          }
        } catch (error) {
            res.status(500).json({ success: false, message: error });
        }
       

       
    },
    deleteCart: async function(req, res){
        try {
            const response = await users.cartDelete({idUser: req.session?.user.id, idProduct: req.params.id, color: req.body.color});
    
            if(response.success){
                res.status(201).send("producto eliminado del carrito")
            } 
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
            res.redirect("/error"); r
        }
    },
    
    deleteUsers: async function(req,res){
        try {
            const response = await users.deleteUser(req.session?.user.id, req.body.password)
            if(response.success){
                res.status(201).json(response);
            }
            else{
                res.status(402).json(response);
            }
    
        } catch (error) {
            res.status(500).json({error: error});
        }
     
    },
    getRestoreToken: async function(req,res) {
        try {
            if (req.user) {
                const sendToken = await users.restorePassword(req.user)
            }
            res.render('users/restore', {token: true})
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    restorePassword: async function (req,res) {
        try {
            const errores = validationResult(req)
            if (errores.isEmpty()) {
                const updatePassword = await users.updatePassword({...req.body, ...req.user})
                if (updatePassword) {
                    res.status(200).render('users/login',{body: {}, errors: {}})
                }
            } else {
                res.status(200).render('users/restore', {token: false, errors: errores.mapped()})
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    changePass: async function(req, res){
        try{
        const response = await users.passChange(req.body, req.params)
        if(response.success){
            res.status(201).json(response);
         }
         else{
             res.status(402).json(response);
         }
 
     } catch (error) {
         res.status(500).json({error: error});
     }
    } 
}