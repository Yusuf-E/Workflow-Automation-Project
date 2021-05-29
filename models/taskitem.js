const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const TaskItem = sequelize.define('taskitem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
});
module.exports = TaskItem;