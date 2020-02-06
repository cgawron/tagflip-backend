const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('annotation', {
        a_id: {
            type:  DataTypes.INTEGER({length: 11}),
            primaryKey: true,
            autoIncrement: true
        },
        s_id: {
            type: DataTypes.INTEGER({length: 11}),
            foreignKey: true,
            allowNull: false,
            unique: 'set_name_unique'
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: 'set_name_unique'
        },
        color: {
            type: DataTypes.CHAR(7)
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })
};