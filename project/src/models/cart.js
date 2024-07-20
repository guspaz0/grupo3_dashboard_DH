const fs = require('fs');
const path = require('path');

const products = require('./products')
const users = require('./user')
let idcont = 0

module.exports = {
    cart: async function (userId) {
        try {
            const user = await users.detail(userId);

    
            if (user.carrito?.length != null) {
                const cartDetails = await Promise.all(user.carrito.map(async (prod) => {
                    const producto = await products.detail(prod.id);
                    return {
                        ...producto.dataValues,
                        cantidad: prod.cantidad,
                        colorSelected: prod.color
                    };
                }));
    
                user.carrito = cartDetails;
                return user;
            } else {
                user.carrito = []
                return user
                
        } }catch (error) {
            return error;
        }
    }}