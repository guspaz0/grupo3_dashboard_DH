module.exports = (sequelize, dataTypes) => {

    const alias = "Colors"
    
    const cols = {
       id:{
        type: dataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
       name:{
        type: dataTypes.STRING(30),
        allowNull: true,
       },
       name_es: {
        type: dataTypes.STRING(30),
        allowNull: true,
       },
       hex:{
        type: dataTypes.STRING(6),
        allowNull: true,
       }
   
    }
    
    const config = {
        tableName: 'colors',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    
    
    
    
    const Colors = sequelize.define(alias, cols, config);
 
    Colors.associate = function(models) {
        Colors.belongsToMany(models.Products, {
            as: 'products',
            through: models.product_colors,
            foreignKey: 'color_id',
            otherKey: 'product_id'
        })
        Colors.hasMany(models.product_colors, {
            as: 'color_products',
            foreignKey: 'color_id'
        })
    }
    
    
    return Colors
    };