const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    personnelId:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    program: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    adress: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    district: {
        type: Sequelize.STRING,
        allowNull: true
    },
    secondemail: {
        type: Sequelize.STRING,
        allowNull: true
    },
    birthdate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    facebook: {
        type: Sequelize.STRING,
        allowNull: true
    },
    twitter: {
        type: Sequelize.STRING,
        allowNull: true
    },
    instagram: {
        type: Sequelize.STRING,
        allowNull: true
    },
    resetToken: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    resetTokenExpiration: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }

});
module.exports = User;