const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const TaskItem = sequelize.define('taskitem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    confirmation:{
        type:Sequelize.BOOLEAN,
        allowNull:true,
    }
});
module.exports = TaskItem;