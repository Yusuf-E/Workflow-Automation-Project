const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

const Department = sequelize.define('department', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

});
module.exports = Department;