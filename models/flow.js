const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

const Flow = sequelize.define('flow', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    approverCount:{
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:false,
    },
    status:{
        type:Sequelize.BOOLEAN,
        allowNull:true,
    }
});
module.exports = Flow;