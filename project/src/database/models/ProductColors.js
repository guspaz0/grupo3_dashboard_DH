module.exports = (sequelize, dataTypes) => {

    const alias = "product_colors"
    
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
        color_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        }
    }
    
    const config = {
        tableName: 'product_colors',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true
    }
    
    const ProductColors = sequelize.define(alias, cols, config);
    
    ProductColors.associate = function(models) {
        ProductColors.belongsTo(models.Products, {
            as: "products",
            foreignKey: "product_id"
        })
        ProductColors.belongsTo(models.Colors, {
            as: "color",
            foreignKey: "color_id"
        })
    }

    return ProductColors
    };