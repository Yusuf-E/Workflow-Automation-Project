const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

const Faculty = sequelize.define('faculty', {
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
module.exports = Faculty;