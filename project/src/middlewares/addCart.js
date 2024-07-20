const db = require('../database/models')

async function addCart (req,res, next) {
    try{
    const id = +req.body.id
    const productos = await db.Products.findByPk(id,{
        include: [
            {
                association: 'colors',
                attributes: ['stock'],
                include: {
                    association: 'color',
                    attributes: ['id','name','hex']
                },
            },
        ],
        attributes: {exclude: ['category_id']},
        logging: false,
    })

    const color = productos.colors.filter(element => element.dataValues.color.dataValues.id == req.body.color)
    if(parseInt(req.body.cantidad) <= parseInt(color[0].dataValues.stock) ){
        next()
    } else {
            return res.status(400).send("No hay suficiente stock para el color seleccionado");
        }
    } catch (error) {
        return res.status(500).send("Ha ocurrido un error interno en el servidor");
    }
}

module.exports = addCart;