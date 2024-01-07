const { Sequelize } = require("sequelize");
const db = require('../config/dbConfig');
const Category = require('../models/categoryModel');
const { DataTypes } = Sequelize;

const Books = db.define('books', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100)
    },
    author: {
        type: DataTypes.STRING(50)
    },
    publication: {
        type: DataTypes.SMALLINT
    },
    synopsis: {
        type: DataTypes.STRING(1000)
    },
    status: {
        type: DataTypes.SMALLINT
    },
    img_title: {
        type: DataTypes.STRING(255)
    },
    img_url: {
        type: DataTypes.STRING(255)
    },
    category_id: {
        type: DataTypes.SMALLINT
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

Books.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

module.exports = Books;