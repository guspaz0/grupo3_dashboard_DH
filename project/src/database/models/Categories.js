module.exports = (sequelize, dataTypes) => {

    const alias = "Categories"
    
    const cols = {
       id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
       name:{
        type: dataTypes.STRING(30),
        allowNull: true,
       }
   
    }
    
    const config = {
        tableName: 'categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    
    
    
    
    const Categories = sequelize.define(alias, cols, config);

    Categories.associate = function(models) {
        Categories.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'category_id',
            timestamps: false
        })
    }
    
    return Categories
    };