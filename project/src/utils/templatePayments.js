const fs = require('fs');
const path = require('path');
const productos = require('../data/productos.json');
const users = require('../data/users.json')

const comprasPath = path.join(__dirname+'/../data/payments.json')
const comprasJson = JSON.parse(fs.readFileSync(comprasPath,'utf-8'))

let referencia = 1

for (let x = 0; x < 20; x++) {
    let cantidadCarrito = Math.ceil(5*Math.random())
    let products = []
    for (let y = 0; y < cantidadCarrito; y++ ) {
        let index = Math.round((productos.length-1)*Math.random())
        let indexColor = Math.round((productos[index].color.length-1)*Math.random())
        if (products.some((p) => p.id == productos[index].id && p.color == productos[index].color[indexColor])) continue
        else {
            products.push({
                id: productos[index].id,
                price: productos[index].price,
                color: productos[index].color[indexColor],
                cantidad: Math.round(10*Math.random())
            })
        }
    }
    let estados_pago = ['completado','enproceso','cancelado', 'rechazado']
    comprasJson.push({
        referencia: referencia,
        Userid: users[Math.round((users.length-1)*Math.random())].id,
        products,
        total: products.reduce((acum, prod) => acum+(prod.price*prod.cantidad),0),
        fecha: new Date(2023,10+(Math.round(2*Math.random())),Math.round(30*Math.random()),0,0,0),
        estado_pago: estados_pago[Math.round((estados_pago.length-1)*Math.random())]
    })
    referencia += 1
}

fs.writeFileSync(comprasPath,JSON.stringify(comprasJson,0,4),'utf-8')