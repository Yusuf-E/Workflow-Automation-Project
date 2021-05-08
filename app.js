const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./utility/database');

const User = require('./models/user');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(userRoutes);



sequelize
    .sync()
    .then(()=>{

    }).catch((err)=>{
        console.log(err);
    })

app.listen(3000, function () {
    console.log("Port 3000 listening");
});