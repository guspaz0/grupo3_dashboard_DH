const db = require('../database/models');
const {Op, Sequelize} = require('sequelize');

module.exports = {
    all: async function(){
        try {
            const response = await db.Categories.findAll({attributes: ['id','name'], logging: false})
            return response
        } catch (error) {
            return error
        }
    },
    countAll: async function(){
        try {
            const response = await db.Categories.findAll({
                include: {
                    association: 'products',
                    attributes: []
                },
                attributes: [
                    'id',
                    'name',
                    [Sequelize.fn('count',Sequelize.col('products.id')),'productsCount']
                ],
                group: ['Categories.id', 'Categories.name'],
                logging: false,
                raw:true
            })
            return response
        } catch (error) {
            return error
        }
    },
    detail: async function (id) {
        try {
            return await db.Categories.findByPk(+id, {logging: false})
        } catch (error) {
            return error
        }
    },
    create: async function(body) {
        try {
            const newCat = await db.Categories.create({...body}, {logging: false})
            return newCat
        } catch (error) {
            return error
        }
    },
    countByCategory: async function () {
        try {
            const data = await this.countAll()
            let count = {}
            data.forEach(({name, productsCount})=> {
                count = {...count, [name]: productsCount}
            })
            return count
        } catch (error) {
            return error
        }
    }
}