const products = require('../models/products');
const payments = require('../models/payments');
const categories = require('../models/categories.js');
const favorites = require('../models/favorites');
const colors = require('../models/colors.js'); 
const User = require('../models/user');
const dataGeo = require('../models/dataGeo.js')
const {validationResult} = require('express-validator')


module.exports = {
    products: {
        list: async function (req,res) {
            try {
                const filter = await products.filter(req.query)
                const response = {
                    count: filter.length,
                    countByCategory: await categories.countByCategory(),
                    products: filter.map(prod => {
                        let data = prod.get({plain:true})
                        return {...data, detail: `http://${process.env.DB_HOST}:${process.env.API_PORT}/api/products/${data.id}`}
                    })
                }
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        detail: async function (req,res) {
            try {
                const response = await products.detail(+req.params.id)
                res.status(200).json(response)
            } catch (error) {s
                res.status(500).json(error.message)
            }
        }
    },
    payments: {
        all: async function (req,res) {
            try {
                const response = await payments.all(req.query)
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        detail: async function (req,res) {
            try {
                const response = await payments.detallePago(req.params.id)
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        userPayment: async function (req,res) {
            try {
                const id = req.session.user.id
                const {perPage, page} = req.query
                const response = await payments.userDetail(id,+perPage,+page)
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        new: async function(req,res) {
            try {
                const response = await payments.create(req.body)
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        update: async function(req,res) {
            try {
                const response = await payments.updateStatus(req.body)
                res.status(200).json(response)
            } catch (error) {
                console.log(error.message)
                res.status(500).json(error.message)
            }
        },
        metrics: async function (req,res) {
            try {
                const response = await payments.metrics(req.body)
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        }
    },
    categories: {
        new: async function (req,res) {
            try {
                const response = await categories.create(req.body)
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        }
    },
    favorites: {
        user: async function (req,res) {
            try {
                const userId = req.session.user.id;
                const response = await favorites.userFav(userId)
                res.status(200).json(response)
            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        add: async function (req,res) {
            try {
                let { product } = req.body
                const user = req.session.user.id
                const addFav = await favorites.add(user, product)
                res.status(200).json(addFav)
            } catch (error) {
                res.status(500).json(error.message)
            }
        }
    },
    users: {
        all: async function(req, res){
            try {
                let userArray = [];
                
                const users = await User.index();
                if(!users) throw new Error ("no hay usuario");
                for (let user in users){
                    let usersobj = {
                        id: users[user].id,
                        name: users[user].nombre,
                        email: users[user].email,
                        detail: `http://${process.env.DB_HOST}:${process.env.API_PORT}/api/users/${users[user].id}`
                    }; 
    
                    userArray.push(usersobj);
                }
                const usersApi = {
                    count: users.length,
                    users: userArray
                };
                res.status(200).json(usersApi);
            } catch (error) {
                res.status(500).json(error.message);
            }
        },
        login: async function (req,res) {
            try {
                const errores = validationResult(req)
                if (errores.isEmpty()) {
                    if (req.user?.token){
                        res.status(200).json(req.user.token)
                    } else {
                        res.status(401).json({access: false, message: 'solo administradores'})
                    }
                    
                } else {
                    res.status(401).json(errores.mapped())
                } 
            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        profile: async function (req,res) {
            try {
                if (req.user.token) {
                    const user = await User.detail(+req.user.id)
                    res.status(200).json({...user, access: true})
                } else {
                    res.status(401).json({access: false, error: 'NotAuthorized'})
                }
            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        byid: async function(req,res){
            try {
                const {id} = req.params
                const user = await User.findOneUser(id)
                if(user){
                    res.status(200).json(user)
                }


            } catch (error) {
                res.status(500).json(error.message)
            }
        },
        allregistro: async function(req,res){
            try {
                const users = await User.forRegistro();
                if(!users) throw new Error ("no hay usuario");
                res.status(200).json(users);
            } catch (error) {
                res.status(500).json(error.message);
            }
        },
        delete: async function(req,res){
            try {
                const deleteUser = await User.deleteUser(req.params.id, null)
                res.status(200).json(deleteUser);
            } catch (error) {
                res.status(500).json(error.message);
            }
        }
    }
}