const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('size', {
        id: {
            type: DataTypes.JSONB,
            primaryKey: true,
            unique:true,
            allowNull: false
        },
        stock: {
            type: DataTypes.JSONB,
            defaultValue:{min:0,max:2000}
        },
        counter: {
            type: DataTypes.JSONB,
        }

    }, { timestamps: false })
}