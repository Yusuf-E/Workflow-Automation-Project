const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const sequelize = require('../utility/database');
const path = require('path');
const User = require('../models/user')
const Faculty = require('../models/faculty');

app.use(bodyParser.urlencoded({ extended: true }));

module.exports.getAddUser = (req, res, next) => {
    res.render('admin/add-user', {
        title: 'Add-User',
        path: '/admin/add-user',

    })
}
module.exports.postAddUser = (req, res, next) => {
    const faculty = req.body.signinfaculty;
    const department = req.body.signindepartment;
    const program = req.body.signinprogram;
    const personnelId = req.body.signinpersonnelId;
    const name = req.body.signinname;
    const surname = req.body.signinlastname;
    const phoneNumber = req.body.signinphone;
    const email = req.body.signinemail;
    const password = req.body.signinpassword;

    User.findOne({ where: { personnelId: personnelId } })
        .then((user) => {
            if (user) {
                console.log('Bu personel sisteme kayıtlı');
                return res.redirect('/admin/add-user')
            }
            User.findOne({ where: { email: email } })
                .then((user) => {
                    if (user) {
                        console.log('Bu personel sisteme kayıtlı');
                        return res.redirect('/admin/add-user')
                    }
                    return User.create({ personnelId: personnelId, name: name, surname: surname, email: email, password: password, faculty: faculty, department: department, program: program, phone: phoneNumber });
                })
                .then(() => {
                    console.log('Kullanıcı Oluşturuldu.');
                    return res.redirect('/index')
                })
        })
}
module.exports.getUserList = (req, res, next) => {
    User.findAll()
        .then((users) => {
            res.render('admin/users', {
                title: 'Kullanıcılar',
                users: users,
                path: '/admin/users'
            })
        }).catch((err) => {
            console.log(err);
        })
}
module.exports.getAddFaculty = (req, res, next) => {
    res.render('admin/add-faculty',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/admin/add-faculty'
        });
}
module.exports.postAddFaculty = (req, res, next) => {
    const facultyname = req.body.facultyname;
    Faculty.findOne({ where: { name: facultyname } })
        .then((faculty) => {
            if (faculty) {
                console.log('Bu personel sisteme kayıtlı');
                return res.redirect('/admin/add-faculty')
            }
            return Faculty.create({ name: facultyname })
        })
        .then(() => {
            res.redirect('/index',);
        })
}
