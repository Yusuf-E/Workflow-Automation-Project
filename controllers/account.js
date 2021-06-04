const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const User = require('../models/user');
const bcrypt = require('bcrypt');
module.exports.getLogin = (req, res, next) => {
    res.render('account/page-login',
        {
            title: 'Giriş | İş Akışları Otomasyon Sistemi',
            path: '/'
        });
}
module.exports.postLogin = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    console.log(email+password);
    User.findOne({where:{email:email}})
        .then((user)=>{
            if(!user){
                return res.redirect('/');
            }
            bcrypt.compare(password,user.password)
                .then((isSuccess)=>{
                    if(isSuccess){
                        req.session.user = user;
                        req.session.isAuthenticated = true;
                        return req.session.save((err)=>{
                            var url = req.session.redirectTo || '/index'
                            delete req.session.redirectTo;
                            res.redirect(url);
                        })
                    }
                    res.redirect('/')
                })
                .catch(function (err) {
                    console.log(err);
                })
        }).catch(function (err) {
            console.log(err);
        })
}