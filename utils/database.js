// Create database connetction
const Sequelize = require("sequelize");

const sequelize = new Sequelize('nodeops', 'root', 'deep70', {
    dialect: 'mysql',
    hostname: 'hostname'
})
module.exports = sequelize;