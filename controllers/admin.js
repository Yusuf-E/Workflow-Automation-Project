const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const sequelize = require('../utility/database');
const path = require('path');

module.exports.getAddUser = function (req, res, next) {
            res.render('admin/add-user', {
                title: 'Admin Products',
                path: '/admin/add-user',

            })

}

