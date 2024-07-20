const db = require('../database/models')
const {Op, Sequelize} = require('sequelize');
const Images = require('./images');
const Colors = require('./colors');


module.exports = {
    all: async function () {
        try {
            const response = await db.Products.findAll({
                include: [
                    {
                        association: 'colors',
                        attributes: ['stock'],
                        include: {
                            association: 'color',
                            attributes: ['id','name','name_es','hex']
                        }
                    },
                    {
                        model: db.Images,
                        as: 'images',
                        attributes: ['id','pathName'],
                        through: { attributes: [] }
                    },
                    {
                        association: 'categories',
                        attributes: ['id','name']
                    }
                ],
                attributes: {exclude: ['category_id']},
                order: [['created_at', 'ASC']],
                logging: false,
            })
            return response
        } catch (error) {
            return error
        }
    },
    detail: async function (id, userId) {
        try {
            const response = await db.Products.findByPk(+id,{
                include: [
                    {
                        association: 'colors',
                        attributes: ['stock'],
                        include: {
                            association: 'color',
                            attributes: ['id','name','name_es','hex']
                        }
                    },
                    {
                        model: db.Images,
                        as: 'images',
                        attributes: ['id','pathName'],
                        through: { attributes: [] }
                    },
                    {
                        association: 'categories',
                        attributes: ['id','name']
                    },
                    {
                        association: 'favorites',
                        attributes: ['id', [Sequelize.fn("concat",Sequelize.col('nombre'),", ",Sequelize.col('apellido')),"nombreApellido"]],
                        through: {attributes:[]}
                    }
                ],
                attributes: {exclude: ['category_id']},
                logging: false,
            })
            return response
        } catch (error) {
            return error
        }
    },
    filter: async function (query) {
        try {
            const {price, line, name, category, color, page, perPage} = query
            let condition = {}
            if (price) condition.products = {...condition.products, price: {[Op.lte]: price}};
            if (line) condition.products = {...condition.products, line: line};
            if (name) condition.products = {...condition.products, 
                [Op.or]: [
                    {name: {[Op.startsWith]: name}},
                    {name: {[Op.like]: `%${name}`}}
                ]};
            if (category) condition.categories = { ...condition.categories, id: category};
            if (color) condition.colors = {...condition.colors, color_id: color};
            let pagination;
            if (page && perPage) pagination = {limit: +perPage, offset: ((+page-1)*+perPage)};
            const filter = await db.Products.findAll({
                include: [
                    {
                        association: 'colors',
                        attributes: ['stock'],
                        include: {
                            association: 'color',
                            attributes: ['id','name','name_es','hex'],
                            
                        },
                        where: condition.colors,
                    },
                    {
                        model: db.Images,
                        as: 'images',
                        attributes: ['id','pathName'],
                        through: { attributes: [] }
                    },
                    {
                        association: 'categories',
                        attributes: ['id','name'],
                        where: condition.categories
                    },
                    {association: 'favorites'}
                ],
                where: condition.products,
                attributes: {exclude: ['category_id']},
                logging: false,
                limit: pagination?.limit,
                offset: pagination?.offset
            })
            return filter
        } catch (error) {
            console.log(error)
            return error
        }
    },
    create: async function (data, images) {
        try {
            const { name, description, line, category, color, price, stock, imageHold } = data
            const newProduct = await db.Products.create({
                name: name,
                description: description,
                category_id: +category,
                line: line,
                price: +price
            })
            if (newProduct) {
                await Colors.createProductColor(color, stock, newProduct.id);
                await Images.newProductImage(imageHold, images, newProduct.id)
                return await this.detail(newProduct.id)
            } else {
                throw new Error('error al crear producto')
            }
        } catch (error) {
            return error
        }
    },
    edited: async function (body, files) {
        try {
            const { id, name, description, line, category, color, price, stock, imageHold } = body
            await Images.editProductImages(imageHold, files, id)
            await Colors.editProductColors(color, stock, id)

            await db.Products.update({
                    name: name,
                    description: description,
                    category_id: +category,
                    line: line,
                    price: +price
                },
                {
                    where: {id: body.id}
            });
            return await this.detail(body.id)
        } catch (error) {
            return error
        }
    },
    remove: async function (id){
        try {
            //await Images.destroyProduct(id)
            //await Colors.destroyProduct(id)
            return await db.Products.destroy({where: {id: id}})
        } catch (error) {
            return error
        }
    },
    deleteImages: function (images) {

    }
}