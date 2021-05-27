const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const User = require('../models/user');

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
    if((email == 'email@gmail.com')&&(password=='1234')){
        req.isAuthenticated= true;
        res.redirect('/index');
    }
    else{
        req.isAuthenticated=false;
        res.redirect('/')
    }
}