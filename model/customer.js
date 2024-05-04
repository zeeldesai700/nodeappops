// requried DB connection
const dbcon = require('../utils/database');
const Sequelize = require('sequelize');

// Define database table with appropriate fields
const customer = dbcon.define('customers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING(20),
        allowNull:false
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull:false
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull:false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull:false
    },
    gender: {
        type: Sequelize.ENUM,
        values: ['M', 'F', 'O'],
    },
    address: {
        type: Sequelize.STRING(255),
    },
    profile: {
        type: Sequelize.STRING(255),
        allowNull:true
    },
    type: {
        type: Sequelize.STRING(10),
        allowNull: false
    }
}, {
    freezeTableName: true, // Table create with same name
});

module.exports = customer;