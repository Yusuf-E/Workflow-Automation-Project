const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
let _transporter;
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
module.exports.getLogout = (req,res,next)=>{
    req.session.destroy((err)=>{
        res.redirect('/');
    })
}
module.exports.getForgotPassword = (req, res, next) => {
    res.render('account/page-reset-password',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/reset-password'
        });
}
module.exports.postForgotPassword = (req, res, next) => {
    const email = req.body.email;
    var randomstring = Math.random().toString(36).slice(-8);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kafkasyusuf1999@gmail.com',
          pass: 'Y741852963' // Your Mail Password Here
        }
      });
      transporter.verify(function (error, success) {

        if (error) throw error;
      
        console.log('Bağlantı başarıyla sağlandı');
        _transporter = transporter;
        User.findOne({where:{email:email}})
        .then((user)=>{
            if(user){
                password = bcrypt.hash(randomstring,10)
                .then((hashedPassword)=>{
                    user.password = hashedPassword;
                    user.save();
                    const msg = {
                        to: user.email,
                        from: 'Yusuf EFE <kafkasyusuf1999@gmail.com>',
                        subject: 'Hesap Oluşturuldu',
                        text: 'Şifreniz: '+randomstring +' \n Uyarı: '+'Giriş Yaptıktan sonra lütfen şifrenizi değiştirin',
                    }
                    _transporter.sendMail(msg)
                        .then(() => {
                            console.log('Email sent')
                            res.redirect('/')
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                })
         
            }
            else{
                res.redirect('/forgot-password')
            }

        })
    })


  
  
}