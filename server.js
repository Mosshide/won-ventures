const express = require('express')
const app = express(); 
const path = require('path'); 
const bcrypt = require('bcrypt'); 
const methodOverride = require('method-override');

app.use(express.urlencoded ({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))


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


// Index route 
app.get('/', (req,res) => {
    res.render('./user/login.ejs')
})



app.listen(3000, (req,res) => {
    console.log("Is this thing on?")
});

// index route 
// new route 
// show route 
// update route 
// override 
// delete route 



// login 
// register 
// show 
