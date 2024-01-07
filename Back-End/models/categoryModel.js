const { Sequelize } = require("sequelize");
const db = require('../config/dbConfig');
const { DataTypes } = Sequelize;

const Category = db.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100)
    },
    date_created: {
        type: DataTypes.DATE
    },
    date_changed: {
        type: DataTypes.DATE
    },
    delete: {
        type: DataTypes.SMALLINT
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Category;