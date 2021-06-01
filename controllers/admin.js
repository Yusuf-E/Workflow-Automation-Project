const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const sequelize = require('../utility/database');
const path = require('path');
const User = require('../models/user')
const Faculty = require('../models/faculty');
const Department = require('../models/department');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
app.use(bodyParser.urlencoded({ extended: true }));
module.exports.getAddUser = (req, res, next) => {
    let faculties;
    Faculty.findAll()
        .then((_faculties) => {
            faculties = _faculties;
            Department.findAll({ order: [['name', 'ASC']], attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name'],] })
                .then((departments) => {
                    res.render('admin/add-user', {
                        title: 'Add-User',
                        departments: departments,
                        faculties: faculties,
                        path: '/admin/add-user',

                    })
                })
        }).catch((err) => {
            console.log(err)
        })

}
module.exports.postAddUser = (req, res, next) => {
    let _user,_hashedPassword;
    const facultyid = req.body.signinfaculty;
    const departmentname = req.body.signindepartment;
    console.log(departmentname);
    const program = req.body.signinprogram;
    const personnelId = req.body.signinpersonnelId;
    const name = req.body.signinname;
    const surname = req.body.signinlastname;
    const phoneNumber = req.body.signinphone;
    const email = req.body.signinemail;
    const password = personnelId+name+surname;

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
                    return bcrypt.hash(password,10)
                })
                .then((hashedPassword) => {
                    _hashedPassword = hashedPassword;
                    return hashedPassword;

                })
                .then((hashedPassword)=>{
                    Department.findOne({ where: { name: departmentname, facultyId:facultyid}})
                    .then((department)=>{
                        console.log(department.id);
                        return User.create({ personnelId: personnelId, nameSurname: name+" "+surname, email: email, password: _hashedPassword, facultyId: facultyid, departmentId: department.id, program: program, phone: phoneNumber });

                    })
                    .then((user)=>{
                        _user = user;
                        return user.getTask();
                    })
                    .then((task)=>{
                        if(!task){
                            return _user.createTask();
                        }
                        return task;
                    })
                    .then((result)=>{
                        console.log('Kullanıcı Oluşturuldu.');
                        res.redirect('/admin/users')
                    })
                })
        })
}
module.exports.getUserList = (req, res, next) => {
    User.findAll()
        .then((users) => {
            let _users = users;
            Faculty.findAll()
                .then((faculties) => {
                    let _faculties = faculties;
                    Department.findAll()
                        .then((departments) => {
                            res.render('admin/users', {
                                title: 'Kullanıcılar',
                                users: _users,
                                departments: departments,
                                faculties: _faculties,
                                path: '/admin/users'
                            })
                        })
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
            res.redirect('/admin/faculties',);
        })
}
module.exports.getFacultyList = (req, res, next) => {
    Faculty.findAll()
        .then((faculties) => {
            res.render('admin/faculties', {
                title: 'Kurumlar/Fakülteler',
                faculties: faculties,
                path: '/admin/faculties'
            })
        }).catch((err) => {
            console.log(err);
        })
}
module.exports.getAddDepartment = (req, res, next) => {
    Faculty.findAll()
        .then((faculties) => {
            res.render('admin/add-department',
                {
                    title: 'Bölüm Ekle',
                    faculties: faculties,
                    path: '/admin/add-department'
                });
        })

}
module.exports.postAddDepartment = (req, res, next) => {
    const facultyid = req.body.facultyname;
    const departmentname = req.body.departmentname;
    Department.findOne({ where: { name: departmentname, facultyId:facultyid } })
        .then((department) => {
            if (department) {
                console.log('Bu departman sistemde kayıtlı');
                return res.redirect('/admin/add-department')
            }
            return Department.create({ name: departmentname, facultyId: facultyid })
        })
        .then(() => {
            res.redirect('/admin/departments',);
        })
}
module.exports.getDepartmentList = (req, res, next) => {
    Faculty.findAll()
        .then((faculties) => {
            let _faculties=faculties;
            Department.findAll()
             
                .then((departments) => {
                    res.render('admin/departments', {
                        title: 'Kurumlar/Fakülteler',
                        departments: departments,
                        faculties: _faculties,
                        deps:JSON.stringify(departments),
                        path: '/admin/departments'
                    })
                })
        }).catch((err) => {
            console.log(err);
        })
}
module.exports.postSearchDepartment = (req,res,next)=>{
    const departmentName = req.body.searchBar;
    console.log(departmentName);
    Faculty.findAll()
    .then((faculties) => {
        let _faculties=faculties;
        Department.findAll({where:{name:departmentName}})
         
            .then((departments) => {
                res.render('admin/departments', {
                    title: 'Kurumlar/Fakülteler',
                    departments: departments,
                    faculties: _faculties,
                    path: '/admin/departments'
                })
            })
    }).catch((err) => {
        console.log(err);
    })
}
