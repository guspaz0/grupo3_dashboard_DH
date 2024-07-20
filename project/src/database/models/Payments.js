module.exports = (sequelize, dataTypes) => {

    const alias = "Payments"
    
    const cols = {
       id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
        user_id:{
        type: dataTypes.INTEGER,
        allowNull: false,
       },
        total:{
        type: dataTypes.DECIMAL(10,2),
        allowNull: false,
       },
        status:{
            type: dataTypes.ENUM('cancelado', 'completado', 'enproceso', 'rechazado'),
        allowNull: false,
    }
   
    }
    
    const config = {
        tableName: 'payments',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    

    const Payment = sequelize.define(alias, cols, config);

    Payment.associate = function(models) {
        Payment.belongsTo(models.Users,{
            as: 'user',
            foreignKey: 'user_id',
        })
        Payment.hasMany(models.payment_products,{
            as: 'products',
            foreignKey: 'payment_id',
        })
    }

    return Payment
    };