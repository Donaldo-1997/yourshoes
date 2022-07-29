const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('size', {
        // id:{
        //     type: DataTypes.BIGINT,
        //     primaryKey: true,
        //     unique: true
        // },
number: {
    type: DataTypes.INTEGER,
    allowNull: false
},
stock: {
    type: DataTypes.INTEGER,
    allowNull: false
},
counter:{
    type: DataTypes.INTEGER,
}

    }, { timestamps: false })}