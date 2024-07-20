const db = require('../database/models');
const {Sequelize, Op} = require('sequelize');

module.exports = {
    productFavs: async function() {
        try {
            const {count, rows} = await db.Favorites.findAll({
                include: {
                    association: 'favorites',
                },
                attributes: [
                    'id'
                ]
            })
            return {count,rows}
        } catch (error) {
            return error
        }
    },
    userFav: async function (userId) {
        try {
            const response = await db.Users.findOne({
                include: {
                    association: 'favorites',
                    include: [{
                        association: 'images',
                        attributes: {exclude: ['created_at', 'updated_at']},
                        through: {attributes: []}
                    }],
                    attributes: ['id','name', 'price'],
                    through: {attributes: []}
                },
                attributes: [],
                where: {id: +userId},
                logging: false
            })
            return response.favorites
        } catch (error) {
            
        }
    },
    add: async function (userId,productId) {
        try {
            const [newFav, created] = await db.Favorites.findOrCreate({
                where: {
                    product_id: +productId,
                    user_id: +userId
                },
                logging: false
            });
            if (created) {
                return {success: true, action: 'added'}
            } else {
                return await this.remove(userId,productId)
            }
        } catch (error) {
            return error
        }
    },
    remove: async function (userId,productId) {
        try {
            const delFav = await db.Favorites.destroy({
                where: {
                    user_id: +userId,
                    product_id: +productId
                },
                logging: false
            });
            return delFav == 1? {success: true, action: 'remove'} : {success: false, action: 'remove'}
        } catch (error) {
            return error
        }
    }
}