const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('tag', {
        t_id: {
            type: DataTypes.INTEGER({length: 11}),
            primaryKey: true,
            autoIncrement: true
        },
        d_id: {
            type: DataTypes.INTEGER({length: 11}),
            foreignKey: true,
            allowNull: false
        },
        a_id: {
            type:  DataTypes.INTEGER({length: 11}),
            foreignKey: true,
            allowNull: false
        },
        start_index: {
            type:  DataTypes.INTEGER({length: 11}),
            allowNull: false
        },
        end_index: {
            type:  DataTypes.INTEGER({length: 11}),
            allowNull: true
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })
};