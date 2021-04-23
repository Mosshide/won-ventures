const express = require('express')
const app = express(); 
const path = require('path'); 
const bcrypt = require('bcrypt'); 

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/wonVentures', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { 
        console.log("Mongo connection open!")
    })
    .catch(err => {
        console.log("Error!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Index Route 
app.get('/user', async(req,res) => {
    res.send('Index Page!')
    // res.render('/user')
});

app.listen(3000, (req,res) => {
    console.log("Is this thing on?")
});
