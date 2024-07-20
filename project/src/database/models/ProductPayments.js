module.exports = (sequelize, dataTypes) => {

    const alias = "payment_products"
    
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
        payment_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        color_id: {
            type: dataTypes.INTEGER
        },
        cantidad: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        precio: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
    }
    
    const config = {
        tableName: 'payment_products',
        timestamps: false,
    }
    
    const ProductPayments = sequelize.define(alias, cols, config);
    
    ProductPayments.associate = function(models) {
        ProductPayments.belongsTo(models.Products, {
            as: "product",
            foreignKey: "product_id"
        })
        ProductPayments.belongsTo(models.Payments, {
            as: "payment",
            foreignKey: "payment_id"
        }),
        ProductPayments.belongsTo(models.Colors,{
            as:'color',
            foreignKey: 'color_id'
        })
    }

    return ProductPayments
    };