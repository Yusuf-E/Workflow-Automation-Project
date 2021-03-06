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
const nodemailer = require('nodemailer');
const { DATE } = require('sequelize');
let _transporter;
app.use(bodyParser.urlencoded({ extended: true }));
module.exports.getAddUser = (req, res, next) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: req.user.email,
          pass: '' // Your Mail Password Here
        }
      });
      transporter.verify(function (error, success) {

        if (error) throw error;
      
        console.log('Bağlantı başarıyla sağlandı');
        _transporter = transporter;
        let faculties;
        Faculty.findAll()
            .then((_faculties) => {
                faculties = _faculties;
                Department.findAll({ order: [['name', 'ASC']], attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name'],] })
                    .then((departments) => {
                        res.render('admin/add-user', {
                            title: 'Add-User',
                            departments: departments,
                            isAuthenticated: req.session.isAuthenticated,
                            faculties: faculties,
                            path: '/admin/add-user',
    
                        })
                    })
            }).catch((err) => {
                console.log(err)
            })
      
      });



}
module.exports.postAddUser = (req, res, next) => {
    let _user, _hashedPassword;
    const facultyid = req.body.signinfaculty;
    const departmentname = req.body.signindepartment;
    console.log(departmentname);
    const program = req.body.signinprogram;
    const personnelId = req.body.signinpersonnelId;
    const name = req.body.signinname;
    const surname = req.body.signinlastname;
    const phoneNumber = req.body.signinphone;
    const email = req.body.signinemail;
    const password = personnelId + name + surname;

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
                    return bcrypt.hash(password, 10)
                })
                .then((hashedPassword) => {
                    _hashedPassword = hashedPassword;
                    return hashedPassword;

                })
                .then((hashedPassword) => {
                    Department.findOne({ where: { name: departmentname, facultyId: facultyid } })
                        .then((department) => {
                            console.log(department.id);
                            return User.create({ personnelId: personnelId, nameSurname: name + " " + surname, email: email, password: _hashedPassword, facultyId: facultyid, departmentId: department.id, program: program, phone: phoneNumber, imageUrl: 'default-user-image.png' ,birthdate: Date.now()});

                        })
                        .then((user) => {
                            _user = user;
                            return user.getTask();
                        })
                        .then((task) => {
                            if (!task) {
                                return _user.createTask();
                            }
                            return task;
                        })
                        .then((result) => {
                            console.log('Kullanıcı Oluşturuldu.');
                            const msg = {
                                to: email,
                                from: 'Yusuf EFE <kafkasyusuf1999@gmail.com>',
                                subject: 'Hesap Oluşturuldu',
                                text: 'Hesap Oluşturuldu Şifreniz:'+personnelId+name+surname,
                            }
                            _transporter.sendMail(msg)
                                .then(() => {
                                    console.log('Email sent')
                                    res.redirect('/admin/users')
                                })
                                .catch((error) => {
                                    console.error(error)
                                })
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
                                requser:req.user,
                                departments: departments,
                                isAuthenticated: req.session.isAuthenticated,
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
            isAuthenticated: req.session.isAuthenticated,
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
                isAuthenticated: req.session.isAuthenticated,
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
                    isAuthenticated: req.session.isAuthenticated,
                    path: '/admin/add-department'
                });
        })

}
module.exports.postAddDepartment = (req, res, next) => {
    const facultyid = req.body.facultyname;
    const departmentname = req.body.departmentname;
    Department.findOne({ where: { name: departmentname, facultyId: facultyid } })
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
            let _faculties = faculties;
            Department.findAll()

                .then((departments) => {
                    res.render('admin/departments', {
                        title: 'Kurumlar/Fakülteler',
                        departments: departments,
                        faculties: _faculties,
                        isAuthenticated: req.session.isAuthenticated,
                        deps: JSON.stringify(departments),
                        path: '/admin/departments'
                    })
                })
        }).catch((err) => {
            console.log(err);
        })
}
module.exports.postSearchDepartment = (req, res, next) => {
    const departmentName = req.body.searchBar;
    console.log(departmentName);
    Faculty.findAll()
        .then((faculties) => {
            let _faculties = faculties;
            Department.findAll({ where: { name: departmentName } })

                .then((departments) => {
                    res.render('admin/departments', {
                        title: 'Kurumlar/Fakülteler',
                        departments: departments,
                        isAuthenticated: req.session.isAuthenticated,
                        faculties: _faculties,
                        path: '/admin/departments'
                    })
                })
        }).catch((err) => {
            console.log(err);
        })
}
module.exports.getUpdateUser = (req, res, next) => {
    const userid = req.params.userid;
    let faculty, _user;
    User.findOne({ where: { id: userid } })
        .then((user) => {
            _user = user;
            Faculty.findAll()
                .then((_faculty) => {
                    faculty = _faculty;
                    Department.findAll()
                        .then((department) => {
                            res.render('admin/update-user', {
                                title: 'Kullanıcı Güncelle',
                                faculty: faculty,
                                user: _user,
                                department: department,
                                path: '/admin/update-user'
                            })
                        })
                }).catch((err) => {
                    console.log(err)
                })
        })
}
module.exports.postUpdateUser = (req, res, next) => {
    const userid = JSON.parse(req.body.userid);
    const facultyid = req.body.signinfaculty;
    const departmentname = req.body.signindepartment;
    const personnelId = req.body.signinpersonnelId;
    const name = req.body.signinname;
    const phoneNumber = req.body.signinphone;
    const email = req.body.signinemail;
    User.findOne({ where: { id: userid } })
        .then((user) => {
            _user = user;
            Department.findOne({ where: { facultyId: facultyid, name: departmentname } })
                .then((department) => {
                    _user.facultyId = facultyid;
                    _user.departmentId = department.id;
                    _user.personnelId = personnelId;
                    _user.nameSurname = name;
                    _user.phone = phoneNumber;
                    _user.email = email;
                    return _user
                })
                .then((userUpdate) => {
                    userUpdate.save();
                    res.redirect('/admin/users');
                })
        })
}
module.exports.postDeleteUser =  (req, res, next) => {
    const userid = req.params.userid
    User.findOne({where:{ id: userid}})
        .then( (user)=> {
            return user.destroy()
        }).then(function (result) {
            res.redirect('/admin/users')
        })
        .catch(function (err) {
            console.log(err);
        })
}
module.exports.postDeleteFaculty =  (req, res, next)=> {
    const facultyid = req.params.facultyid
    Faculty.findOne({where:{ id: facultyid}})
        .then( (faculty)=> {
            return faculty.destroy()
        }).then(function (result) {
            res.redirect('/admin/faculties')
        })
        .catch(function (err) {
            console.log(err);
        })
}
module.exports.postDeleteDepartment =  (req, res, next)=> {
    const departmentid = req.params.departmentid
    Department.findOne({where:{ id: departmentid}})
        .then( (department)=> {
            return department.destroy()
        }).then(function (result) {
            res.redirect('/admin/departments')
        })
        .catch(function (err) {
            console.log(err);
        })
}