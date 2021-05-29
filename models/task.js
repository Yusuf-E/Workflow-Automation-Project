const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

const Task = sequelize.define('task', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
});
module.exports = Task;