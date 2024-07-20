module.exports = (sequelize, dataTypes) => {

    const alias = "Favorites"
    
    const cols = {
        product_id:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        user_id:{
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    
    const config = {
        timestamps: false,
        tableName: 'favorites'
    }
    
    const Favorites = sequelize.define(alias, cols, config);

    Favorites.associate = function(models) {
        // Favorites.belongsTo(models.Products, {
        //     as: 'product',
        //     foreignKey: 'product_id',
        //     otherKey: 'id'
        // }),
        // Favorites.belongsTo(models.Users, {
        //     as: 'user',
        //     foreignKey: 'product_id',
        //     otherKey: 'id'
        // })
    }

    
    return Favorites
    };