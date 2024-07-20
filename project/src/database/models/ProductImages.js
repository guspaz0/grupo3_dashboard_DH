module.exports = (sequelize, dataTypes) => {

    const alias = "prod_images"
    
    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    
    const config = {
        tableName: 'prod_images',
        timestamps: false,
    }
    
    const ProductImages = sequelize.define(alias, cols, config);
    
    ProductImages.associate = function(models) {
        ProductImages.belongsTo(models.Products, {
            as: "products",
            foreignKey: "product_id"
        })
        ProductImages.belongsTo(models.Images, {
            as: "images",
            foreignKey: "image_id"
        })
    }

    return ProductImages
    };