const { Sequelize } = require("sequelize");
const db = require('../config/dbConfig');
const { DataTypes } = Sequelize;

const Users = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100)
    },
    username: {
        type: DataTypes.STRING(50)
    },
    password: {
        type: DataTypes.STRING(255)
    },
    phone: {
        type: DataTypes.STRING(16)
    },
    address: {
        type: DataTypes.STRING(500)
    },
    role_id: {
        type: DataTypes.SMALLINT
    },
    last_login: {
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

module.exports = Users;