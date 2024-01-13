const { Sequelize } = require("sequelize");
const db = require('../config/dbConfig');
const { DataTypes } = Sequelize;

const Loans = db.define('loans', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    book_id: {
        type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.SMALLINT
    },
    date_start: {
        type: DataTypes.DATE
    },
    date_return: {
        type: DataTypes.DATE
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

module.exports = Loans;