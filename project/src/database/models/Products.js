module.exports = (sequelize, dataTypes) => {

    const alias = "Products"
    
    const cols = {
       id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
       name:{
        type: dataTypes.STRING(50),
        allowNull: false
       },
       category_id: {
        type: dataTypes.INTEGER,
        allowNull: false
       },
       description:{
        type: dataTypes.STRING(128),
        allowNull: true,
       },
       line:{
        type: dataTypes.ENUM('artesanal', 'sublimada'),
        allowNull: false,
       },
       price:{
        type: dataTypes.DECIMAL(10,2),
        allowNull: false,
       }
   
    }
    
    const config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true
    }
    
    const Products = sequelize.define(alias, cols, config);
    
    Products.associate = function(models) {
        Products.belongsTo(models.Categories, {
            as: 'categories',
            foreignKey: "category_id",
            timestamps: false,
        })
        Products.hasMany(models.product_colors, {
            as: 'colors',
            foreignKey: 'product_id'
        })
        Products.belongsToMany(models.Images,{
            as: 'images',
            through: models.prod_images,
            foreignKey: 'product_id',
            otherKey: 'image_id'
        })
        Products.belongsToMany(models.Users,{
            as: 'favorites',
            through: models.Favorites,
            foreignKey: 'product_id',
            otherKey: 'user_id'
        })
    }


    
    return Products
    } ;